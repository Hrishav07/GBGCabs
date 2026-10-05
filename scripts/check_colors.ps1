Add-Type -AssemblyName System.Drawing

function Check-Colors($path, $label) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    Write-Output "=== $label ==="
    # Sample a few points around the text
    # Sample at y = 380, x = 50, 100, 150
    for ($y = 370; $y -le 400; $y += 10) {
        $c = $bmp.GetPixel(60, $y)
        Write-Output "Y=$y, X=60: R=$($c.R), G=$($c.G), B=$($c.B)"
    }
    $bmp.Dispose()
}

Check-Colors "a:\GBGCabs\public\team\akash_ali.png" "Akash"
Check-Colors "a:\GBGCabs\public\team\vijaya_shrivastava.png" "Vijaya"
Check-Colors "a:\GBGCabs\public\team\suryansh_raj_pandey.png" "Suryansh"
