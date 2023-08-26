/** ## Buff
 * The basis to all Buffs or Powerups
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