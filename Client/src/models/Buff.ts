/** ## Buff
 * The basis to all Buffs 
 * 
 * ---
 *   **damageMultiplier:** number
 * 
 *   **healthMultipier:** number
 * 
 *   **lightningMultiplier:** number
 * 
 *   **fireMultiplier:** number
 * 
 *   **waterMultiplier:** number
 * 
 *   **plantMultiplier:** number
 * 
 *   **poisonMultiplier:** number
 */
interface Buff {
    name: string
    id: string
    damageMultiplier: number
    healthMultipier: number
    lightningMultiplier: number
    fireMultiplier: number
    waterMultiplier: number
    plantMultiplier: number
    poisonMultiplier: number
}
export default Buff