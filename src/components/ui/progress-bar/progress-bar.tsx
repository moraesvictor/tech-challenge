import clsx from "clsx"

type ProgressBarProps = {
  value: number
  color?: "green" | "red" | "blue" | "cyan" | "gray"
  label?: string
  height?: string
  className?: string
}

export const ProgressBar = ({
  value,
  color = "green",
  label,
  height = "h-2",
  className,
}: ProgressBarProps) => {
  const colorMap: Record<string, string> = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    cyan: "bg-cyan-500",
    gray: "bg-gray-400",
  }

  return (
    <div className={clsx("w-full flex flex-col", className)}>
      <div className={clsx("w-full bg-gray-700 rounded-full overflow-hidden", height)}>
        <div
          className={clsx(
            colorMap[color],
            height,
            "rounded-full transition-all duration-700 ease-out"
          )}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>

      {label && (
        <p className="text-xs text-gray-400 mt-1 text-center">
          {label.replace("{value}", `${Math.round(value)}%`)}
        </p>
      )}
    </div>
  )
}
