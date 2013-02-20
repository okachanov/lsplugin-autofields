
<!-- Autofields plugin -->
<script type="text/javascript" src="{$oConfig->GetValue("path.root.web")}/plugins/autofields/templates/skin/default/js/init.js"></script>
<script type="text/javascript">
var Autofields_OneLetterWidthPx = {$oConfig->GetValue("plugin.autofields.One_Letter_Width_Px")};
var Autofields_ChangeLinesCount = {$oConfig->GetValue("plugin.autofields.Change_Lines_Count")};
var Autofields_ChangeLinesHeight = {$oConfig->GetValue("plugin.autofields.Change_Lines_Height")};
// ---
{assign var="AutoSizeFor" value=$oConfig->GetValue("plugin.autofields.Autofields_Process_For_IDs")}
{if $AutoSizeFor}

{literal}
window.addEvent ('domready', function () {
  {/literal}
  {foreach from=$AutoSizeFor item=oAutoSize}
  Autofields_CheckUpTextFields ('{$oAutoSize.object_ID}', {$oAutoSize.min_height}, {$oAutoSize.max_height}, {$oAutoSize.clear_far_parent});
  {/foreach}
  {literal}

});
{/literal}

{/if}
</script>
<!-- /Autofields plugin -->
