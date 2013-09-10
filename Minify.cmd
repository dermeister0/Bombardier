set root=%~dp0
type "%root%\Main\Engine\*.js", "%root%\Main\Entities\*.js", "%root%\Main\app.js", "%root%\Main\Global.js" | "%root%\Tools\jsmin" > "%root%\Main\Bombardier.min.js"
