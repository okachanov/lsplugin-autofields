<?php
//
//  Autofields plugin
//  (P) rafrica.net team, 2010
//  http://we.rafrica.net/
//

class PluginAutofields_HookAutofields extends Hook {

	public function RegisterHook() {
		$this->AddHook ('template_body_begin', 'BodyBegin');
	}

	public function BodyBegin () {
		return $this -> Viewer_Fetch (Plugin::GetTemplatePath (__CLASS__) . 'body_begin.tpl');
	}
	
}

?>