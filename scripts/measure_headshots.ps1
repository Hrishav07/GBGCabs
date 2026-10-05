Add-Type -AssemblyName System.Drawing

function Measure-ImageNose($path, $label) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    Write-Output "Image: $label, Width=$($bmp.Width), Height=$($bmp.Height)"
    
    # We want to find the horizontal center of the face in this 600x600 image.
    # In headshot_vijaya.png, let's sample a horizontal line across her cheeks/nose around Y = 250 to 300
    # Let's inspect brightness across Y=270 from X=150 to 450
    $minBrightness = 999
    $darkestX = 0
    # Or let's inspect the left edge of her hair and right edge of her hair at Y = 240
    $leftHairX = -1
    $rightHairX = -1
    for ($x = 50; $x -lt 550; $x++) {
        $c = $bmp.GetPixel($x, 240)
        # Hair is dark: R < 70, G < 60, B < 60
        if ($c.R -lt 70 -and $c.G -lt 60 -and $c.B -lt 60) {
            if ($leftHairX -eq -1) { $leftHairX = $x }
            $rightHairX = $x
        }
    }
    Write-Output "Y=240 Hair: Left=$leftHairX, Right=$rightHairX, Center=$([int](($leftHairX + $rightHairX) / 2)) (Target is 300)"
    
    $bmp.Dispose()
}

Measure-ImageNose "a:\GBGCabs\public\team\headshot_vijaya.png" "Vijaya"
Measure-ImageNose "a:\GBGCabs\public\team\headshot_akash.png" "Akash"
Measure-ImageNose "a:\GBGCabs\public\team\headshot_suryansh.png" "Suryansh"
