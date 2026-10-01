Add-Type -AssemblyName System.Drawing

$width = 256
$height = 256
$bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Background: Clear
$g.Clear([System.Drawing.Color]::Transparent)

# Dark Squircle
$corner = 50
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddArc(4, 4, $corner*2, $corner*2, 180, 90)
$path.AddArc(252 - $corner*2, 4, $corner*2, $corner*2, 270, 90)
$path.AddArc(252 - $corner*2, 252 - $corner*2, $corner*2, $corner*2, 0, 90)
$path.AddArc(4, 252 - $corner*2, $corner*2, $corner*2, 90, 90)
$path.CloseFigure()

$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 10, 14, 23))
$g.FillPath($bgBrush, $path)

$borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 239, 108, 30), 3)
$g.DrawPath($borderPen, $path)

# White Handlebars and body
$whitePen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 10)
$whitePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$whitePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$whitePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

# Mirrors & Grips
$g.DrawArc($whitePen, 40, 90, 30, 25, 150, 200)
$g.DrawArc($whitePen, 186, 90, 30, 25, 190, 200)

# Lower body apron
$g.DrawLine($whitePen, 70, 120, 70, 160)
$g.DrawLine($whitePen, 186, 120, 186, 160)
$g.DrawLine($whitePen, 70, 160, 186, 160)
$g.DrawLine($whitePen, 95, 160, 95, 175)
$g.DrawLine($whitePen, 161, 160, 161, 175)
$g.DrawLine($whitePen, 95, 175, 161, 175)

# Center horizontal bar
$g.DrawLine($whitePen, 90, 95, 166, 95)

# Orange Pin (Teardrop path)
$pinPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 239, 108, 30), 16)
$pinPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pinPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$pinPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

$pinPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$pinPath.AddArc(68, 20, 120, 120, 215, 290)
$pinPath.AddLine(180, 100, 128, 175)
$pinPath.AddLine(128, 175, 76, 100)
$g.DrawPath($pinPen, $pinPath)

# Rider Head (filled circle)
$orangeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 108, 30))
$g.FillEllipse($orangeBrush, 108, 56, 40, 40)

# Text: "GO BABY GO"
$fontFam = New-Object System.Drawing.FontFamily("Arial")
$font = New-Object System.Drawing.Font($fontFam, 16, [System.Drawing.FontStyle]::Bold)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

$g.DrawString("GO", $font, $orangeBrush, 45, 205)
$g.DrawString("BABY", $font, $whiteBrush, 92, 205)
$g.DrawString("GO", $font, $orangeBrush, 165, 205)

$bmp.Save("A:\GBGCabs\public\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Also save as ICO
$hIcon = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fileStream = [System.IO.File]::OpenWrite("A:\GBGCabs\public\favicon.ico")
$icon.Save($fileStream)
$fileStream.Close()
$icon.Dispose()

$g.Dispose()
$bmp.Dispose()

Write-Host "Favicons generated successfully"
