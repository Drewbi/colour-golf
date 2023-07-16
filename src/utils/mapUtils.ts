import { Matrix3, Vector2, Vector3 } from "three";

export function getNextBallPos(goalPos: Vector3, currGuessPos: Vector3, nextGuessPos: Vector3): Vector2 {
    const dir1 = new Vector3().subVectors(currGuessPos, goalPos).normalize();
    const dir2 = new Vector3().subVectors(nextGuessPos, goalPos).normalize();

    if (dir1.dot(dir2) === 1) {
        throw new Error("The provided vectors are collinear and do not define a plane.");
    }

    const dir3 = new Vector3().crossVectors(dir1, dir2);
    const transformationMatrix = new Matrix3().set(
        dir1.x, dir3.x, 0,
        dir1.y, dir3.y, 0,
        dir1.z, dir3.z, 1,
    );

    const transformedNextGuessPos = nextGuessPos.clone().sub(goalPos).applyMatrix3(transformationMatrix);
    const transformedCurrGuessPos = currGuessPos.clone().sub(goalPos).applyMatrix3(transformationMatrix);
    console.log({transformedCurrGuessPos})
    console.log({goalPos})

    return new Vector2(transformedNextGuessPos.x, transformedNextGuessPos.y);
}
