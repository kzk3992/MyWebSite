import AppKit
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

struct IconCrop {
    let name: String
    let centerX: Int
    let centerY: Int
}

func loadImage(_ url: URL) throws -> CGImage {
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
          let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
        throw NSError(domain: "BrandAssets", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not read \(url.path)"])
    }
    return image
}

func writePNG(_ image: CGImage, to url: URL) throws {
    guard let destination = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil) else {
        throw NSError(domain: "BrandAssets", code: 2, userInfo: [NSLocalizedDescriptionKey: "Could not create \(url.path)"])
    }
    CGImageDestinationAddImage(destination, image, [kCGImagePropertyPNGCompressionFilter: 5] as CFDictionary)
    guard CGImageDestinationFinalize(destination) else {
        throw NSError(domain: "BrandAssets", code: 3, userInfo: [NSLocalizedDescriptionKey: "Could not write \(url.path)"])
    }
}

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let sourceURL = root.appendingPathComponent("public/brand/reference/icon_asset.PNG")
let outputURL = root.appendingPathComponent("public/brand/icons", isDirectory: true)
try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

let sheet = try loadImage(sourceURL)
let iconSize = 140
let crops = [
    IconCrop(name: "wolf", centerX: 119, centerY: 104),
    IconCrop(name: "spark", centerX: 1_068, centerY: 104),
    IconCrop(name: "paw", centerX: 119, centerY: 370),
    IconCrop(name: "power", centerX: 119, centerY: 506),
    IconCrop(name: "arrow-left", centerX: 797, centerY: 506),
    IconCrop(name: "arrow-right", centerX: 933, centerY: 647),
]

for crop in crops {
    // CGImage cropping coordinates follow the source image's top-left origin.
    let rect = CGRect(
        x: crop.centerX - iconSize / 2,
        y: crop.centerY - iconSize / 2,
        width: iconSize,
        height: iconSize
    )
    guard let cut = sheet.cropping(to: rect) else { continue }
    var pixels = [UInt8](repeating: 0, count: iconSize * iconSize * 4)
    guard let context = CGContext(
        data: &pixels,
        width: iconSize,
        height: iconSize,
        bitsPerComponent: 8,
        bytesPerRow: iconSize * 4,
        space: CGColorSpaceCreateDeviceRGB(),
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else { continue }
    context.draw(cut, in: CGRect(x: 0, y: 0, width: iconSize, height: iconSize))

    for index in stride(from: 0, to: pixels.count, by: 4) {
        let lightestDarkChannel = min(pixels[index], pixels[index + 1], pixels[index + 2])
        if lightestDarkChannel >= 247 {
            pixels[index + 3] = 0
        } else if lightestDarkChannel > 222 {
            pixels[index + 3] = UInt8((Int(247 - lightestDarkChannel) * 255) / 25)
        }
    }

    guard let result = context.makeImage() else { continue }
    try writePNG(result, to: outputURL.appendingPathComponent("\(crop.name).png"))
}

print("Created \(crops.count) brand icons in \(outputURL.path)")
