export const generateRandonUserName = () => {
    return `guest${Math.floor(Math.random() * 99999)}`
}