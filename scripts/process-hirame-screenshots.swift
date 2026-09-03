import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

// Run from the repository root. Always crop the original PNGs, not prior outputs.
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let sources = root.appendingPathComponent("public/images/hirame", isDirectory: true)
let outputs = root.appendingPathComponent("public/brand/hirame/screens", isDirectory: true)
let cropTop = 131
let outputWidth = 1179
let outputHeight = 2425
let screenshots = [
    ("Home.png", "home.jpg"),
    ("note.png", "note.jpg"),
    ("Random note.png", "random-note.jpg"),
    ("hassouhou.png", "methods.jpg"),
    ("Random.png", "random.jpg"),
    ("Bridge.png", "association.jpg"),
    ("Game.png", "association-game.jpg"),
    ("Clear.png", "association-clear.jpg"),
]

func failure(_ message: String) -> NSError {
    NSError(domain: "HirameScreenshots", code: 1, userInfo: [NSLocalizedDescriptionKey: message])
}

// Validate all originals before replacing any website assets.
let crops: [(String, CGImage)] = try screenshots.map { sourceName, outputName in
    let url = sources.appendingPathComponent(sourceName)
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
          let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
        throw failure("Could not read \(url.path)")
    }
    guard image.width == outputWidth, image.height == cropTop + outputHeight else {
        throw failure("Unexpected dimensions for \(sourceName): \(image.width)x\(image.height)")
    }
    // CGImage crop coordinates start at the top-left. Keep the full width and bottom.
    let rect = CGRect(x: 0, y: cropTop, width: outputWidth, height: outputHeight)
    guard let cropped = image.cropping(to: rect) else {
        throw failure("Could not crop \(sourceName)")
    }
    return (outputName, cropped)
}

for (outputName, image) in crops {
    let url = outputs.appendingPathComponent(outputName)
    guard let destination = CGImageDestinationCreateWithURL(url as CFURL, UTType.jpeg.identifier as CFString, 1, nil) else {
        throw failure("Could not create \(url.path)")
    }
    CGImageDestinationAddImage(destination, image, [kCGImageDestinationLossyCompressionQuality: 0.9] as CFDictionary)
    guard CGImageDestinationFinalize(destination) else {
        throw failure("Could not write \(url.path)")
    }
    print("\(outputName): \(image.width)x\(image.height), top \(cropTop)px removed")
}
