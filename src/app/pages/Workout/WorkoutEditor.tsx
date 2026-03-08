import {
    useEffect,
    useState
} from "react"
import client from "../../../api/client"
import { exerciseActions } from "./../../../features/exercise/exerciseSlice"

import { useNavigate } from "react-router-dom"
import {
    useAppDispatch,
    useAppSelector
} from "../../hooks"
import { uiActions } from "../../../features/ui/uiSlice"
import { workoutActions } from "../../../features/workout/workoutSlice"
import { useParams } from "react-router-dom"

const WorkoutEditor = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector((s) => s.exercise.status)
    const exercises = useAppSelector((s) => s.exercise.exercises)

    const [query, setQuery] = useState("")
    const { id } = useParams<{ id: string }>();

    const filteredExercises = exercises.filter((exercise) => {
        return exercise.name.toLowerCase().includes(query.toLowerCase())
    })

    type WorkoutSet = {
        id?: number
        set_number: number
        reps: string
        weight: string
    }

    type WorkoutExercise = {
        workout_exercise_id?: number
        exercise_id: number
        exercise_name: string
        sets: WorkoutSet[]
    }

    const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([])

    const addExercise = (exercise: any) => {
        setSelectedExercises((prev) => {
            if (prev.some((priorExercise) => priorExercise.exercise === exercise.id)) {
                return prev
            }

            return [
                ...prev,
                {
                    exercise_id: exercise.id,
                    exercise_name: exercise.name,
                    sets: [
                        { set_number: 1, reps: "", weight: "" }
                    ]
                }
            ]
        })
    }

    const removeExercise = (exercise: any) => {
        setSelectedExercises((prev) => prev.filter((x) => x.exercise_id !== exercise.exercise_id))
    }

    const moveUp = (index: number) => {
        if (index === 0) return
        setSelectedExercises((prev) => {
            const copy = [...prev]
                ;[copy[index - 1], copy[index]] = [copy[index], copy[index - 1]]
            return copy
        })
    }

    const moveDown = (index: number) => {
        if (index === 0) return
        setSelectedExercises((prev) => {
            const copy = [...prev]
                ;[copy[index + 1], copy[index]] = [copy[index], copy[index + 1]]
            return copy
        })
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(exerciseActions.loadExercises())
        }
    }, [status, dispatch])

    useEffect(() => {
        const loadExistingWorkout = async () => {
            try {
                const res = await client.request({
                    method: "GET",
                    url: `/api/workouts/${id}/`
                });

                const mapped = (res.data.workout_exercises || []).map((workout_exercise: any) => {
                    const matchedExercise = exercises.find((exercise) => exercise.id == workout_exercise.exercise)
                    return {
                        workout_exercise_id: workout_exercise.exercise,
                        exercise_id: workout_exercise.exercise,
                        exercise_name: matchedExercise?.name,
                        sets: (workout_exercise.workout_sets || []).map((workout_set: any) => ({
                            id: workout_set.id,
                            set_number: workout_set.set_number,
                            reps: String(workout_set.reps ?? ""),
                            weight: String(workout_set.weight ?? "")
                        }))
                    }
                })
                setSelectedExercises(mapped)
            } catch (err) {
                dispatch(uiActions.toastAdded({ kind: "error", message: `Error updating workout: ${err}` }));
            }
        };
        loadExistingWorkout()
    }, [id, exercises])

    const addSet = (exerciseId: number) => {
        setSelectedExercises((prev) => {
            return prev.map((ex) => {
                if (ex.exercise_id != exerciseId) {
                    return ex
                }
                const nextSetNumber = ex.sets.length + 1

                return {
                    ...ex,
                    sets: [
                        ...ex.sets,
                        {
                            set_number: nextSetNumber,
                            reps: "",
                            weight: ""
                        }
                    ]
                }
            })
        })
    }

    const updateSetField = (
        exerciseId: number,
        setIndex: number,
        fieldName: "reps" | "weight",
        value: string) => {

        setSelectedExercises((prev) => {
            return prev.map((ex) => {
                if (ex.exercise_id !== exerciseId) {
                    return ex
                }

                const newSets = ex.sets.map((set) => {
                    if (set.set_number === setIndex) {
                        return {
                            ...set,
                            set_number: setIndex,
                            [fieldName]: value
                        }
                    } else {
                        return set
                    }
                })
                return { ...ex, sets: newSets }
            })
        })
    }

    const removeSet = (exerciseId: number, setIndex: number) => {
        setSelectedExercises((prev) => {
            return prev.map((ex) => {
                if (ex.exercise_id !== exerciseId) {
                    return ex
                }
                const newSets = ex.sets.filter((set) => set.set_number !== setIndex)
                return { ...ex, sets: newSets }
            })
        })
    }


    return (
        <div>
            <div className="pageHeader">
                <h1 className="h1">Edit Workout</h1>
            </div>

            <div className="card" style={{ padding: 16 }}>
                {status === "loading" && <div>Loading exercises…</div>}
                {status === "failed" && <div>Couldn’t load exercises.</div>}
                {status === "succeeded" && (
                    <>
                        <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ flex: 1 }}>
                                <label>Find exercise</label>
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search…"
                                />

                                <div style={{ marginTop: 8, border: "1px solid #ddd", maxHeight: 280, overflow: "auto" }}>
                                    {filteredExercises.map((exercise: any) => (
                                        <div
                                            key={exercise.id}
                                            style={{ display: "flex", justifyContent: "space-between", padding: 8 }}
                                        >
                                            <span>{exercise.name}</span>
                                            <button type="button" onClick={() => addExercise(exercise)}>
                                                Add
                                            </button>
                                        </div>
                                    ))}
                                    {filteredExercises.length === 0 && (
                                        <div style={{ padding: 8, opacity: 0.7 }}>No matches.</div>
                                    )}
                                </div>
                            </div>

                            <div style={{ flex: 1 }}>
                                <label>Selected ({selectedExercises.length})</label>

                                <div style={{ marginTop: 8, border: "1px solid #ddd", minHeight: 280 }}>
                                    {selectedExercises.length === 0 ? (
                                        <div style={{ padding: 8, opacity: 0.7 }}>Nothing selected yet.</div>
                                    ) : (
                                        selectedExercises.map((exercise: any, idx: number) => (
                                            <div
                                                key={exercise.workout_exercise_id ?? exercise.id}
                                                className="card"
                                                style={{ padding: 12, marginBottom: 12 }}
                                            >
                                                <div
                                                    className="exerciseCardHeader"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <strong>{idx + 1}. {exercise.exercise_name}</strong>

                                                    <div style={{ display: "flex", gap: 8 }}>
                                                        <button type="button" onClick={() => moveUp(idx)}>↑</button>
                                                        <button type="button" onClick={() => moveDown(idx)}>↓</button>
                                                        <button type="button" onClick={() => removeExercise(exercise)}>Remove</button>
                                                    </div>
                                                </div>

                                                <div style={{ marginTop: 12 }}>
                                                    {exercise.sets.length === 0 ? (
                                                        <div style={{ opacity: 0.7, padding: 8 }}>No sets yet.</div>
                                                    ) : (
                                                        exercise.sets.map((set, setIndex) => (
                                                            <div
                                                                key={set.id ?? `${exercise.exercise_id}-${setIndex + 1}`}
                                                                style={{
                                                                    display: "grid",
                                                                    gridTemplateColumns: "60px 1fr 1fr auto",
                                                                    gap: 8,
                                                                    alignItems: "center",
                                                                    marginBottom: 8
                                                                }}
                                                            >
                                                                <div>Set {setIndex + 1}</div>

                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    placeholder="Reps"
                                                                    value={set.reps}
                                                                    onChange={(e) =>
                                                                        updateSetField(
                                                                            exercise.exercise_id,
                                                                            setIndex + 1,
                                                                            "reps",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />

                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    placeholder="Weight"
                                                                    value={set.weight}
                                                                    onChange={(e) =>
                                                                        updateSetField(
                                                                            exercise.exercise_id,
                                                                            setIndex + 1,
                                                                            "weight",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />

                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeSet(exercise.exercise_id, setIndex + 1)}
                                                                >
                                                                    Remove Set
                                                                </button>
                                                            </div>
                                                        )))
                                                    }
                                                </div>

                                                <button type="button" onClick={() => addSet(exercise.exercise_id)}>
                                                    Add Set
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                            <button type="button" onClick={() => setSelectedExercises([])}>
                                Clear
                            </button>

                            <button
                                type="button"
                                disabled={!id || selectedExercises.length === 0 ? true : false}
                                onClick={() => {
                                    const workoutIdNum = Number(id);

                                    const payload = selectedExercises.map((exercise, index) => ({
                                        workout_exercise_id: exercise.workout_exercise_id,
                                        exercise_id: exercise.exercise_id,
                                        order: index + 1,
                                        sets: exercise.sets.map((set, setIndex) => ({
                                            id: set.id,
                                            set_number: setIndex + 1,
                                            reps: Number(set.reps),
                                            weight: set.weight === "" ? null : Number(set.weight),
                                        })),
                                    }));

                                    dispatch(workoutActions.addWorkoutExercisesAndSets({
                                        workout_id_num: workoutIdNum,
                                        workout_exercises: payload,
                                    }));
                                }}
                            >
                                Save Workout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default WorkoutEditor