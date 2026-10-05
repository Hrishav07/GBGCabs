Add-Type -AssemblyName System.Drawing

function Find-Akash-Face() {
    $bmp = [System.Drawing.Bitmap]::FromFile("a:\GBGCabs\public\team\headshot_akash.png")
    # Akash has dark sunglasses around Y = 160-200. Let's find the sunglasses pixels!
    # Sunglasses are very dark: R < 80, G < 70, B < 80
    $darkX = @()
    for ($y = 150; $y -lt 190; $y++) {
        for ($x = 100; $x -lt 500; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.R -lt 70 -and $c.G -lt 65 -and $c.B -lt 75) {
                $darkX += $x
            }
        }
    }
    if ($darkX.Count -gt 0) {
        $sorted = $darkX | Sort-Object
        $minX = $sorted[0]
        $maxX = $sorted[-1]
        $centerX = [int](($minX + $maxX) / 2)
        Write-Output "Akash Sunglasses: X from $minX to $maxX, Center = $centerX (Target 300)"
    }
    $bmp.Dispose()
}

function Find-Suryansh-Face() {
    $bmp = [System.Drawing.Bitmap]::FromFile("a:\GBGCabs\public\team\headshot_suryansh.png")
    # Suryansh has dark hair at the top around Y = 100-140
    $darkX = @()
    for ($y = 90; $y -lt 130; $y++) {
        for ($x = 100; $x -lt 500; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.R -lt 50 -and $c.G -lt 50 -and $c.B -lt 50) {
                $darkX += $x
            }
        }
    }
    if ($darkX.Count -gt 0) {
        $sorted = $darkX | Sort-Object
        $minX = $sorted[0]
        $maxX = $sorted[-1]
        $centerX = [int](($minX + $maxX) / 2)
        Write-Output "Suryansh Hair: X from $minX to $maxX, Center = $centerX (Target 300)"
    }
    $bmp.Dispose()
}

Find-Akash-Face
Find-Suryansh-Face
