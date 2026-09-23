npm run build
if ($?) {
    Copy-Item -Path .\out\* -Destination . -Recurse -Force
    Write-Host "Deployed to root successfully!"
} else {
    Write-Host "Build failed"
}
