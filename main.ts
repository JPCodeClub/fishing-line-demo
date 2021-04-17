namespace SpriteKind {
    export const LineSegment = SpriteKind.create()
    export const Rod = SpriteKind.create()
}
function generateFishingLine () {
    for (let index = 0; index <= totalLineSegs - 1; index++) {
        Lines[index].left = rod.left + (staticRodLine.width + staticRodLine.width * index) * hookDistX
        Lines[index].top = rod.bottom + (staticRodLine.height + staticRodLine.height * index) * hookDistY
    }
}
let angleDeviation = 0
let hookDistY = 0
let hookDistX = 0
let staticRodLine: Sprite = null
let totalLineSegs = 0
let Lines: Sprite[] = []
let rod: Sprite = null
rod = sprites.create(assets.image`FishingRod`, SpriteKind.Rod)
rod.setPosition(120, 10)
Lines = []
totalLineSegs = 64
for (let index = 0; index < totalLineSegs; index++) {
    Lines.push(sprites.create(assets.image`LineSegment`, SpriteKind.LineSegment))
}
staticRodLine = sprites.create(assets.image`LineSegment`, SpriteKind.LineSegment)
let hook = sprites.create(assets.image`Hook`, SpriteKind.Player)
let hookAngle = 1.56
let lineLength = 100
let hookSway = "RIGHT"
controller.moveSprite(rod, 30, 30)
forever(function () {
    staticRodLine.left = rod.left
    staticRodLine.top = rod.bottom
    hookDistX = (hook.x - rod.left) / (staticRodLine.width * totalLineSegs)
    hookDistY = (hook.top - staticRodLine.bottom) / (staticRodLine.height * totalLineSegs)
    angleDeviation = Math.map(lineLength, 0, totalLineSegs * staticRodLine.height + staticRodLine.height, 0.1, 1 / 75) ** 2
    if (lineLength > totalLineSegs * staticRodLine.height) {
        if (controller.B.isPressed()) {
            lineLength += -1
        }
    } else if (lineLength < 0) {
        lineLength = 0
    } else {
        if (controller.B.isPressed()) {
            lineLength += -1
        } else if (controller.A.isPressed()) {
            lineLength += 1
        }
    }
    hook.x = rod.left + Math.cos(hookAngle) * lineLength
    hook.y = staticRodLine.bottom + Math.sin(hookAngle) * lineLength
    generateFishingLine()
    if (hookAngle > 1.8) {
        hookSway = "RIGHT"
    } else if (hookAngle < 1.32) {
        hookSway = "LEFT"
    }
    if (hookSway == "LEFT") {
        hookAngle += angleDeviation
    } else {
        hookAngle += angleDeviation * -1
    }
})
