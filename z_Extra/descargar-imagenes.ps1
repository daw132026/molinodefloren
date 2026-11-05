$base   = "https://res.cloudinary.com/amenitiz/image/upload/c_limit,w_1920,q_auto:good"
$destino = Join-Path $PSScriptRoot "img"

$imagenes = [ordered]@{
  # --- Identidad / elementos comunes ---
  "general/logo.png"                     = "v1670234794/iiv35iaqrs5bqbbfcitv.png"
  "general/ilustracion-1.png"            = "v1671010479/w4wkxkfdgjexgxzks8rw.png"
  "general/ilustracion-2.png"            = "v1671010485/o1zauuq3ruavlx6cheue.png"
  "general/ilustracion-3.png"            = "v1671010496/x1lrzaqg4t95z8xkfyf9.png"
  "general/ilustracion-4.png"            = "v1671010501/xg7huzaqpje9htjtkvcb.png"

  # --- Página de inicio ---
  "inicio/inicio-1.jpg"                  = "v1670235550/o3w2rmjxqt76prmg4pnx.jpg"
  "inicio/inicio-2.jpg"                  = "v1670235600/m77fs1qkkv86ur4kvtvm.jpg"
  "inicio/comedor.jpg"                   = "v1670235743/xyzsjly7yebeo4ysvrik.jpg"
  "inicio/regala.jpg"                    = "v1670235972/cebgroog9idmhd0bj3zc.jpg"
  "inicio/inicio-5.png"                  = "v1670239250/wulehrsnzjjkpcklje4s.png"

  # --- Cabecera página Habitaciones ---
  "habitaciones/cabecera.jpg"            = "v1670235082/ndy119igkyngj7zzlcoz.jpg"
  "habitaciones/cabecera-deco.png"       = "v1670250583/o0ejpujh3bfshv5rhggn.png"

  # --- Habitaciones (1 = foto principal) ---
  "habitaciones/11-avena-1.jpg"          = "v1669307147/mrnveai5g3pdt68zzpwt.jpg"
  "habitaciones/11-avena-2.jpg"          = "v1669307128/vhtyy0q1k4yzcjcnbp7n.jpg"
  "habitaciones/12-familiar-1.jpg"       = "v1669307396/wesxq4aq2osfavdwwwe6.jpg"
  "habitaciones/12-familiar-2.jpg"       = "v1669307391/hzgmzogl6dfflwure9wa.jpg"
  "habitaciones/12-familiar-3.jpg"       = "v1669307399/ylcbhcygmejexmp8k82k.jpg"
  "habitaciones/13-mijo-1.jpg"           = "v1669309915/ph7yksqvhqo9dbhwosiv.jpg"
  "habitaciones/13-mijo-2.jpg"           = "v1669309909/fv6qx8miqfvdfzdkjl8i.jpg"
  "habitaciones/13-mijo-3.jpg"           = "v1669309917/kgkorxitn0cjizz9e7rw.jpg"
  "habitaciones/doble-2-camas-1.jpg"     = "v1669306661/ojfry0abcin5ssaeele9.jpg"
  "habitaciones/doble-2-camas-2.jpg"     = "v1669306656/roerd4v6vxabwr4qouen.jpg"
  "habitaciones/doble-2-camas-3.jpg"     = "v1669306665/zvfbi5qcxgotdjolgszy.jpg"
  "habitaciones/doble-matrimonio-1.jpg"  = "v1669310190/kw5klvbaxr1u28y4xann.jpg"
  "habitaciones/doble-matrimonio-2.jpg"  = "v1669310186/n917qcphohzmzhivjnwp.jpg"
  "habitaciones/21-cebada-1.jpg"         = "v1669312545/bajcrbktqriivarsceb5.jpg"
  "habitaciones/21-cebada-2.jpg"         = "v1669312552/xgwp4bhmsiyabvcgefyu.jpg"
  "habitaciones/22-maiz-1.jpg"           = "v1669312753/ytyylrftuyfj4onvbf7z.jpg"
  "habitaciones/22-maiz-2.jpg"           = "v1669312759/o3ko38xtoxafalx1gdf1.jpg"
  "habitaciones/22-maiz-3.jpg"           = "v1669312746/daqk5pbmp9ofx5iv5dps.jpg"
  "habitaciones/23-centeno-1.jpg"        = "v1669313350/cp5oi2qn0igntwb2n4kn.jpg"
  "habitaciones/23-centeno-2.jpg"        = "v1669313356/i90f8ykt0mhqjagsact6.jpg"
  "habitaciones/23-centeno-3.jpg"        = "v1669313361/logcaycabhykijxnx4ah.jpg"
  "habitaciones/24-sorgo-1.jpg"          = "v1669313663/lqkeuokvuatimldsllex.jpg"
  "habitaciones/24-sorgo-2.jpg"          = "v1669313670/moa7df50rcf95iko8br2.jpg"
  "habitaciones/24-sorgo-3.jpg"          = "v1669313694/b3uwiuofmkgg9sxn7iz2.jpg"
  "habitaciones/25-amaranto-1.jpg"       = "v1669313845/aw1ldcp3jozed11ocaqg.jpg"
  "habitaciones/25-amaranto-2.jpg"       = "v1669313840/stxoxhslxumuehiex5mq.jpg"
  "habitaciones/31-granero-1.jpg"        = "v1669314042/r6cvtrbzy468vbitbw8y.jpg"
  "habitaciones/31-granero-2.jpg"        = "v1669314047/k6zabqpubimwyyw6dnhh.jpg"

  # --- El hostal ---
  "hostal/hostal-1.jpg"                  = "v1670247986/bmog6jyli0dujgui7jxx.jpg"
  "hostal/hostal-2.jpg"                  = "v1670248348/sqprwlwtfmql1pjymviv.jpg"
  "hostal/hostal-3.jpg"                  = "v1670248339/xkyhirtgytrc9hrentq8.jpg"
  "hostal/hostal-4.jpg"                  = "v1670248329/gnjkpuj160zvjbs35u3y.jpg"
  "hostal/hostal-5.jpg"                  = "v1670248008/kwilfoptadu3cwiemhj4.jpg"
  "hostal/hostal-6.jpg"                  = "v1670248000/ddsjxuyjnlxhdi1tcsj6.jpg"

  # --- Comedor ---
  "comedor/comedor-deco.png"             = "v1670250582/eme1wspigffgcvzealdx.png"

  # --- Celebraciones ---
  "celebraciones/celebraciones-1.jpg"    = "v1670251817/s5jhfo6i47wkswbfi6hq.jpg"
  "celebraciones/celebraciones-2.jpg"    = "v1670248359/jol0innt3b6kx08xeyla.jpg"

  # --- Regala (ofertas / bonos) ---
  "regala/regala-1.jpg"                  = "v1670856803/wrowlk38fksnf6mrulgx.jpg"
  "regala/regala-2.jpg"                  = "v1670252554/udefwwsiknowit17arqk.jpg"
  "regala/regala-3.jpg"                  = "v1670252639/qxs1dbwzpul4c3jpvoes.jpg"

  # --- Reserva y contacto ---
  "reserva/reserva-cabecera.png"         = "v1671010149/athv3ab8rseb5tlhonpb.png"
  "contacto/contacto.jpg"                = "v1670250171/ypusqyhl0byoc61xd329.jpg"
}

$ok = 0; $fallos = @()
foreach ($nombre in $imagenes.Keys) {
  $ruta = Join-Path $destino $nombre
  New-Item -ItemType Directory -Force -Path (Split-Path $ruta) | Out-Null
  try {
    Invoke-WebRequest -Uri "$base/$($imagenes[$nombre])" -OutFile $ruta -UseBasicParsing
    Write-Host "OK  $nombre"; $ok++
  } catch {
    Write-Host "ERR $nombre" -ForegroundColor Red; $fallos += $nombre
  }
}
Write-Host "`nDescargadas $ok de $($imagenes.Count) imagenes en: $destino" -ForegroundColor Green
if ($fallos) { Write-Host "Fallaron: $($fallos -join ', ')" -ForegroundColor Yellow }
Read-Host "Pulsa Enter para cerrar"
