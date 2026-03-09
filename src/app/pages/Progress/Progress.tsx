import { useState } from "react";
import { useAppSelector } from "../../hooks";
import client from "../../../api/client";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

type MetricKey = 'top_set_weight' | 'estimated_1rm' | 'tonnage'

type SeriesPoint = { date: string; value: number }
type SeriesSummary = { start: number | null; latest: number | null; change: number | null }
type SeriesResponse = {
    exercise_id: number
    metric: MetricKey
    unit: string
    points: SeriesPoint[]
    summary: SeriesSummary
}

const METRIC_CONFIG: Record<MetricKey, { label: string; yAxisLabel: string; unit: string }> = {
    top_set_weight: { label: 'Top Set Weight', yAxisLabel: 'Weight (lbs)', unit: 'lbs' },
    estimated_1rm: { label: 'Estimated 1RM', yAxisLabel: 'Est. 1RM (lbs)', unit: 'lbs' },
    tonnage: { label: 'Tonnage', yAxisLabel: 'Volume (lbs×reps)', unit: 'lbs×reps' },
}

const fmt = (val: number | null | undefined, unit: string) =>
    val !== null && val !== undefined ? `${val} ${unit}` : "--";

const ProgressPage = () => {
    const exercises = useAppSelector((state) => state.exercise.exercises);

    const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
    const [selectedMetric, setSelectedMetric] = useState<MetricKey>("top_set_weight");
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");
    const [seriesData, setSeriesData] = useState<SeriesResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const config = METRIC_CONFIG[selectedMetric];

    const pr = seriesData && seriesData.points.length > 0
        ? Math.max(...seriesData.points.map((p) => p.value))
        : null;
    const prDate = pr !== null
        ? (seriesData?.points.find((p) => p.value === pr)?.date ?? "--")
        : "--";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await client.request({
                method: "GET",
                url: `/api/insights/exercise-series/`,
                params: {
                    exercise_id: selectedExerciseId,
                    metric: selectedMetric,
                    from: fromDate || undefined,
                    to: toDate || undefined,
                },
            });
            setSeriesData(res.data as SeriesResponse);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page">
            <div className="pageHeader">
                <h1 className="h1">Progress</h1>
                <p className="pageSubtext">Track PRs and exercise trends over time.</p>
            </div>

            <form onSubmit={handleSubmit} className="card">
                <h2 className="h2">Filters</h2>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                    <div style={{ flex: "1 1 200px" }}>
                        <label htmlFor="exercise">Exercise <span style={{ color: "red" }}>*</span></label>
                        <select
                            id="exercise"
                            value={selectedExerciseId}
                            onChange={(e) => setSelectedExerciseId(e.target.value)}
                            style={{ display: "block", width: "100%", marginTop: 4 }}
                        >
                            <option value="">Select exercise</option>
                            {exercises.map((exercise) => (
                                <option key={exercise.id} value={exercise.id}>
                                    {exercise.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ flex: "1 1 160px" }}>
                        <label htmlFor="metric">Metric <span style={{ color: "red" }}>*</span></label>
                        <select
                            id="metric"
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value as MetricKey)}
                            style={{ display: "block", width: "100%", marginTop: 4 }}
                        >
                            <option value="top_set_weight">Top Set Weight</option>
                            <option value="estimated_1rm">Estimated 1RM</option>
                            <option value="tonnage">Tonnage</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 16 }}>
                    <div>
                        <label htmlFor="fromDate" style={{ fontSize: 13 }}>From <span style={{ opacity: 0.5 }}>(optional)</span></label>
                        <input
                            id="fromDate"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            style={{ display: "block", marginTop: 4 }}
                        />
                    </div>
                    <div style={{ paddingBottom: 6, opacity: 0.5 }}>→</div>
                    <div>
                        <label htmlFor="toDate" style={{ fontSize: 13 }}>To <span style={{ opacity: 0.5 }}>(optional)</span></label>
                        <input
                            id="toDate"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            style={{ display: "block", marginTop: 4 }}
                        />
                    </div>
                </div>

                <div className="formActions">
                    <button type="submit" disabled={!selectedExerciseId || loading}>
                        {loading ? "Loading..." : "Load Progress"}
                    </button>
                </div>
            </form>

            <section className="card">
                <h2 className="h2">{config.label}</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                    <div className="statCard">
                        <p>All-Time PR</p>
                        <h3>{fmt(pr, config.unit)}</h3>
                    </div>
                    <div className="statCard">
                        <p>PR Date</p>
                        <h3>{prDate}</h3>
                    </div>
                    <div className="statCard">
                        <p>Latest</p>
                        <h3>{fmt(seriesData?.summary.latest, config.unit)}</h3>
                    </div>
                    <div className="statCard">
                        <p>Change</p>
                        <h3>
                            {seriesData?.summary.change !== null && seriesData?.summary.change !== undefined
                                ? `${seriesData.summary.change > 0 ? "+" : ""}${seriesData.summary.change} ${config.unit}`
                                : "--"}
                        </h3>
                    </div>
                </div>

                {seriesData && seriesData.points.length > 0 ? (
                    <ResponsiveContainer width="100%" height={360}>
                        <LineChart data={seriesData.points}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis
                                label={{ value: config.yAxisLabel, angle: -90, position: "insideLeft" }}
                                width={80}
                            />
                            <Tooltip formatter={(val: number | undefined) => val !== undefined ? [`${val} ${config.unit}`, config.label] : ["--", config.label]} />
                            <Line type="monotone" dataKey="value" dot={false} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="chartPlaceholder" style={{ textAlign: "center", padding: "48px 0", opacity: 0.5 }}>
                        {seriesData ? "No data for selected filters." : "Select an exercise and metric above, then click Load Progress."}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProgressPage;
