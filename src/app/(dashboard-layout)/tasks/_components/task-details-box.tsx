import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getTaskService } from "../_services/get_task_service";

// ================= TYPES =================
interface UserType {
    id: number;
    name: string;
    phone: string | null;
    avatar?: string | null;
}

interface AssignedBy {
    company_user_id: number;
    user: UserType;
}

interface Assignee {
    department_id: number;
    team_user_id: number;
    user: UserType;
}

interface Department {
    id: number;
    name: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
    created_at: string;
    updated_at: string;
    department: Department;
    assigned_by: AssignedBy;
    assignee: Assignee;
}

interface Props {
    taskID: number;
    onClose: () => void;
}

// ================= HELPERS =================
function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatDateTime(dateStr: string) {
    return new Date(dateStr).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ================= SUB-COMPONENTS =================
function Avatar({ name, variant }: { name: string; variant: "from" | "to" }) {
    const styles = {
        from: "bg-emerald-50 text-emerald-700",
        to: "bg-violet-50 text-violet-700",
    };
    return (
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${styles[variant]}`}
        >
            {getInitials(name)}
        </div>
    );
}

function DateCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-0.5">
                {label}
            </p>
            <p className="text-sm font-medium font-mono text-foreground">{value}</p>
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 px-5">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-foreground animate-spin" />
            <p className="text-[13px] text-muted-foreground">Loading task...</p>
        </div>
    );
}

// ================= COMPONENT =================
export function TaskDetailsBox({ taskID, onClose }: Props) {
    const [task, setTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                setIsLoading(true);
                const data = await getTaskService("general-manager", taskID);
                setTask(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [taskID]);

    const assignedByName = task?.assigned_by?.user?.name ?? "—";
    const assigneeName = task?.assignee?.user?.name ?? "—";

    return (
        <div className="w-full max-w-lg rounded-2xl border border-border/60 bg-background shadow-sm overflow-hidden">

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50">
                <span className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border/50">
                    {task ? `TASK #${task.id}` : "Loading..."}
                </span>
                <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground border border-border/50 bg-muted hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                >
                    <X size={12} strokeWidth={2} />
                </button>
            </div>

            {/* ── Loading / Content ── */}
            {isLoading || !task ? (
                <LoadingSpinner />
            ) : (
                <>
                    {/* ── Body ── */}
                    <div className="px-5 py-5 space-y-4">

                        {/* Title + Department */}
                        <div className="flex items-start justify-between gap-3">
                            <h2 className="text-[17px] font-medium leading-snug text-foreground">
                                {task.title}
                            </h2>
                            {task.department?.name && (
                                <Badge className="shrink-0 text-[11px] font-medium bg-blue-50 text-blue-700 border-blue-100 rounded-full px-2.5 py-0.5">
                                    {task.department.name}
                                </Badge>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-[13.5px] text-muted-foreground leading-relaxed bg-muted/40 border-l-2 border-border pl-3.5 pr-3 py-2.5 rounded-r-md">
                            {task.description}
                        </p>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-2.5">
                            <DateCard label="Due date" value={formatDate(task.due_date)} />
                            <DateCard label="Created" value={formatDate(task.created_at)} />
                            <div className="col-span-2">
                                <DateCard
                                    label="Last updated"
                                    value={formatDateTime(task.updated_at)}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-border/50" />

                        {/* Users */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2.5">
                                <Avatar name={assignedByName} variant="from" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-0.5">
                                        Assigned by
                                    </p>
                                    <p className="text-sm font-medium text-foreground leading-tight">
                                        {assignedByName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <Avatar name={assigneeName} variant="to" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-0.5">
                                        Assigned to
                                    </p>
                                    <p className="text-sm font-medium text-foreground leading-tight">
                                        {assigneeName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Footer strip ── */}
                    <div className="flex items-center justify-between px-5 py-3 bg-muted/40 border-t border-border/50">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[12px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                In Progress
                            </span>
                        </div>
                        <span className="text-[12px] text-muted-foreground">
                            Updated{" "}
                            {new Date(task.updated_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}