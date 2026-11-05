// HATCHIEggy LIVE — live stats from the contract via public BSC RPC, copy-prompt, quantity total.
// No wallet needed: reads go through public RPC endpoints with fallbacks.
// Never presents a failed read as a verified zero.
(function () {
  var NFT = '0xF2a6D1A5Da92d611cf8eC614548D4d6E83BEB6D8';
  var RPCS = [
    'https://bsc-dataseed.binance.org',
    'https://bsc-dataseed1.defibit.io',
    'https://rpc.ankr.com/bsc'
  ];
  // Function selectors (verified against the deployed contract):
  var SEL_TOTAL_MINTED = '0xa2309ff8'; // totalMinted()
  var SEL_MINT_OPEN = '0x24bbd049';    // mintOpen()
  var SEL_MAX_SUPPLY = '0x32cb6b0c';   // MAX_SUPPLY()
  var SEL_PRICE = '0x9d1b464a';        // currentPrice()

  function rpcCall(rpc, data) {
    return fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to: NFT, data: data }, 'latest'] })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j || !j.result) throw new Error('no result');
      return j.result;
    });
  }

  function callWithFallback(data) {
    var chain = Promise.reject();
    RPCS.forEach(function (rpc) {
      chain = chain.catch(function () { return rpcCall(rpc, data); });
    });
    return chain;
  }

  function parseUint(hex) {
    try { return parseInt(hex, 16); } catch (e) { return NaN; }
  }

  function refreshStats() {
    var mintedEl = document.getElementById('mintedCount');
    var statusEl = document.getElementById('mintStatus');
    var priceEl = document.getElementById('priceNow');
    callWithFallback(SEL_TOTAL_MINTED).then(function (hex) {
      var n = parseUint(hex);
      var txt = isNaN(n) ? 'unavailable' : (n.toLocaleString('en-US') + ' / 4,444');
      if (mintedEl) mintedEl.textContent = txt;
      var limitedEl = document.getElementById('limitedMinted');
      if (limitedEl) limitedEl.textContent = txt;
    }).catch(function () { if (mintedEl) mintedEl.textContent = 'unavailable'; var le = document.getElementById('limitedMinted'); if (le) le.textContent = 'unavailable'; });
    callWithFallback(SEL_MINT_OPEN).then(function (hex) {
      var open = parseUint(hex) === 1;
      if (statusEl) statusEl.textContent = open ? 'Open' : 'Closed';
    }).catch(function () { if (statusEl) statusEl.textContent = 'unavailable'; });
    callWithFallback(SEL_PRICE).then(function (hex) {
      var wei = parseUint(hex);
      if (priceEl && !isNaN(wei)) priceEl.textContent = (wei / 1e18).toFixed(4).replace(/0+$/, '').replace(/\.$/, '.0') + ' BNB';
    }).catch(function () { /* keep the static 0.001 BNB fallback text */ });
  }

  // Quantity selector: total assumes the wallet's first mint is still free.
  var qty = 1;
  function updateTotal() {
    var totalEl = document.getElementById('qtyTotal');
    if (!totalEl) return;
    var paid = Math.max(0, qty - 1);
    totalEl.textContent = (paid * 0.001).toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + ' BNB';
    if (paid === 0) totalEl.textContent = '0 BNB';
  }
  var btns = document.querySelectorAll('.qtybtn');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      qty = parseInt(b.getAttribute('data-qty'), 10) || 1;
      btns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      updateTotal();
    });
  });
  updateTotal();

  function copyPrompt(statusId) {
    var el = document.getElementById('agentPrompt');
    var status = document.getElementById(statusId);
    if (!el) return;
    var text = el.textContent || '';
    function done(msg) { if (status) status.textContent = msg; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done('Prompt copied — mint is live on 0xF2a6D1A5Da92d611cf8eC614548D4d6E83BEB6D8.'); }, function () { done('Copy failed — select the prompt text manually.'); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done('Prompt copied — mint is live on 0xF2a6D1A5Da92d611cf8eC614548D4d6E83BEB6D8.'); }
      catch (e) { done('Copy failed — select the prompt text manually.'); }
      document.body.removeChild(ta);
    }
  }
  var b1 = document.getElementById('copyPromptBtn');
  if (b1) b1.addEventListener('click', function () { copyPrompt('copyStatus'); });
  var b2 = document.getElementById('copyPromptBtn2');
  if (b2) b2.addEventListener('click', function () { copyPrompt('copyStatus2'); });

  refreshStats();
  setInterval(refreshStats, 30000);
})();
