import { useState } from "react";
import { useAppSelector } from "../../hooks";

const ProgressPage = () => {
    const exercises = useAppSelector((state) => state.exercise.exercises);

    const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
    const [selectedMetric, setSelectedMetric] = useState<string>("top_set_weight");
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");

    return (
        <div className="page">
            <div className="pageHeader">
                <h1 className="h1">Progress</h1>
                <p className="pageSubtext">Track PRs and exercise trends over time.</p>
            </div>

            <section className="card">
                <h2 className="h2">Filters</h2>

                <div className="formGrid">
                    <div>
                        <label htmlFor="exercise">Exercise</label>
                        <select
                            id="exercise"
                            value={selectedExerciseId}
                            onChange={(e) => setSelectedExerciseId(e.target.value)}
                        >
                            <option value="">Select exercise</option>
                            {exercises?.map((exercise: any) => (
                                <option key={exercise.id} value={exercise.id}>
                                    {exercise.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="metric">Metric</label>
                        <select
                            id="metric"
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                        >
                            <option value="top_set_weight">Top Set Weight</option>
                            <option value="estimated_1rm">Estimated 1RM</option>
                            <option value="tonnage">Tonnage</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fromDate">From</label>
                        <input
                            id="fromDate"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="toDate">To</label>
                        <input
                            id="toDate"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section className="card">
                <h2 className="h2">Summary</h2>
                <div className="statsGrid">
                    <div className="statCard">
                        <p>All-Time PR</p>
                        <h3>--</h3>
                    </div>
                    <div className="statCard">
                        <p>PR Date</p>
                        <h3>--</h3>
                    </div>
                    <div className="statCard">
                        <p>Latest</p>
                        <h3>--</h3>
                    </div>
                    <div className="statCard">
                        <p>Change</p>
                        <h3>--</h3>
                    </div>
                </div>
            </section>

            <section className="card">
                <h2 className="h2">Chart</h2>
                <div className="chartPlaceholder">
                    Chart goes here
                </div>
            </section>
        </div>
    );
};

export default ProgressPage;