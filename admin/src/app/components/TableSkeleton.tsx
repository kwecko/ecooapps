export default function TableSkeleton() {
  const styles = {
    text: "h-2 bg-slate-200 rounded",
    image: "w-12 h-12 bg-slate-200 rounded-lg",
    button: "w-8 h-8 bg-slate-200 rounded-lg",
    row: "flex items-center w-full py-2 border-b last:border-none hover:bg-slate-50/50 transition-colors"
  }

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm">
      <div className="animate-pulse">
        <div className={styles.row}>
          <div className="w-16"></div>
          <div className="w-1/4">
            <div className={`${styles.text} w-20`}></div>
          </div>
          <div className="w-1/4">
            <div className={`${styles.text} w-24`}></div>
          </div>
          <div className="w-1/4">
            <div className={`${styles.text} w-16`}></div>
          </div>
          <div className="w-1/4">
            <div className={`${styles.text} w-20`}></div>
          </div>
          <div className="w-24"></div>
        </div>

        {[...Array(12)].map((_, index) => (
          <div key={index} className={styles.row}>
            <div className="w-16">
              <div className={styles.image}></div>
            </div>
            <div className="w-1/4">
              <div className={`${styles.text} w-32`}></div>
            </div>
            <div className="w-1/4">
              <div className={`${styles.text} w-16`}></div>
            </div>
            <div className="w-1/4">
              <div className={`${styles.text} w-20`}></div>
            </div>
            <div className="w-1/4">
              <div className={`${styles.text} w-12`}></div>
            </div>
            <div className="w-24 flex gap-2">
              <div className={styles.button}></div>
              <div className={styles.button}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

