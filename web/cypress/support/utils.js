function dateFormatter(date) {
    const formattedDate = date.toLocaleDateString('pt-BR')
    return formattedDate
}

class RandomArrays {
    constructor(array) {
        this.name = array
    }

    getRandomArray() {
        const randomIndex = Math.floor(Math.random() * this.name.length)

        const randomResult = []
        for (let i = 0; i < randomIndex; i++) {
            const item = this.name[Math.floor(Math.random() * this.name.length)]
            if (!randomResult.includes(item)) {
                randomResult.push(item)
            }
        }
        return randomResult
    }
}

function getDiscoveryChannels(consultancy) {
    if (!consultancy.discoveryChannelOptions) return []
    return new RandomArrays(consultancy.discoveryChannelOptions).getRandomArray()
}

function getTechs(consultancy) {
    if (!consultancy.techOptions) return []
    return new RandomArrays(consultancy.techOptions).getRandomArray()
}

export { dateFormatter, getDiscoveryChannels, getTechs }