set root=%~dp0
del %root%\Main\Bombardier.min.js

type "%root%\Main\Engine\*.js" > "%root%\Main\Bombardier0.js"
type "%root%\Main\Entities\*.js" > "%root%\Main\Bombardier1.js"
type "%root%\Main\app.js" > "%root%\Main\Bombardier2.js"
type "%root%\Main\Global.js" > "%root%\Main\Bombardier3.js"

type "%root%\Main\Bombardier*.js" | "%root%\Tools\jsmin" > "%root%\Main\Bombardier.min.js"

del "%root%\Main\Bombardier?.js"