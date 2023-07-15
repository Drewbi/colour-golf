import { Vector2, Vector3 } from "three";

export function getNextBallPos(goalPos: Vector3, currGuessPos: Vector3, nextGuessPos: Vector3): Vector2 {
    const goal2curr = new Vector3().subVectors(goalPos, currGuessPos)
    const goal2next = new Vector3().subVectors(goalPos, nextGuessPos)

    const unitVec = new Vector3().crossVectors(
        goal2curr,
        goal2next
    ).normalize()

    const basisX = goal2curr.clone().normalize()
    const basisY = new Vector3().crossVectors(unitVec, basisX)

    return new Vector2(nextGuessPos.dot(basisX) * 0.1, nextGuessPos.dot(basisY) * 0.1)
}
