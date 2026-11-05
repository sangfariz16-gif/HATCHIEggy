// HATCHIE Covenant-style preview — mint disabled, copy-prompt only.
(function () {
  function copyPrompt(statusId) {
    var el = document.getElementById('agentPrompt');
    var status = document.getElementById(statusId);
    if (!el) return;
    var text = el.textContent || '';
    function done(msg) { if (status) status.textContent = msg; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done('Prompt copied — remember: preview only, no contract deployed.'); }, function () { done('Copy failed — select the prompt text manually.'); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done('Prompt copied — remember: preview only, no contract deployed.'); }
      catch (e) { done('Copy failed — select the prompt text manually.'); }
      document.body.removeChild(ta);
    }
  }
  var b1 = document.getElementById('copyPromptBtn');
  if (b1) b1.addEventListener('click', function () { copyPrompt('copyStatus'); });
  var b2 = document.getElementById('copyPromptBtn2');
  if (b2) b2.addEventListener('click', function () { copyPrompt('copyStatus2'); });
})();
