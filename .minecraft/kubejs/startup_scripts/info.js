if (Platform.isClientEnvironment()) {
    console.log('register client event handler')

    onForgeEvent('net.minecraftforge.client.event.RenderGameOverlayEvent$Text', event => {
        const mc = Client.minecraft
        const fpsPattern = /(\d+) fps/
        if (mc.options.renderDebug) return
        let time = mc.level.dayTime()
        let day = Math.floor(time / 24000)
        let timeOfDay = time % 24000
        let hour = Math.floor(timeOfDay / 1000) + 6;
        if (hour >= 24) {
            hour -= 24
        }
        let minute = Math.floor((timeOfDay % 1000) * 0.06)
        event.left.add(`Day ${day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`)
        let match = mc.fpsString.match(fpsPattern)
        if (match && match.length > 1) {
            event.left.add(`FPS: ${match[1]}`)
        }
    })

}