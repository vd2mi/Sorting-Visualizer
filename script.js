let array = []
let isSorting = false
let isCancelled = false

const sizeSlider = document.getElementById("size")
const sizeValue = document.getElementById("sizeValue")
const typeSelect = document.getElementById("type")
const algoSelect = document.getElementById("algo")
const speedSlider = document.getElementById("speed")
const speedLabel = document.getElementById("speedLabel")

const btnGenerate = document.getElementById("btn-generate")
const btnStart = document.getElementById("btn-start")
const btnStop = document.getElementById("btn-stop")
const btnReset = document.getElementById("btn-reset")

const statusLabel = document.getElementById("statusLabel")
const algoLabel = document.getElementById("algoLabel")
const barsContainer = document.getElementById("bars")
const infoContent = document.getElementById("infoContent")
const statsContent = document.getElementById("statsContent")
const treeContent = document.getElementById("treeContent")

const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.getElementById("themeIcon")
const themeText = document.getElementById("themeText")

let stats = {
    comparisons: 0,
    swaps: 0,
    passes: 0,
    bogoShuffles: 0,
    recursiveCalls: 0,
    startTime: 0,
    endTime: 0
}

const algorithmInfo = {
    merge: {
        name: "Merge Sort",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(n)",
        stable: "Yes",
        description: "Merge Sort recursively splits the array into halves, sorts each half, and then merges them. It is stable and has predictable performance."
    },
    quick: {
        name: "Quick Sort",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
        space: "O(log n)",
        stable: "No",
        description: "Quick Sort partitions the array around a pivot and recursively sorts the partitions. It is very fast in practice on average inputs."
    },
    heap: {
        name: "Heap Sort",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(1)",
        stable: "No",
        description: "Heap Sort builds a binary heap and repeatedly extracts the maximum element. It guarantees O(n log n) time and uses constant extra space."
    },
    tim: {
        name: "Timsort",
        best: "O(n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(n)",
        stable: "Yes",
        description: "Timsort is a hybrid algorithm combining Merge Sort and Insertion Sort. It detects runs in the data and is used in real-world language libraries."
    },
    bubble: {
        name: "Bubble Sort",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
        stable: "Yes",
        description: "Bubble Sort repeatedly swaps adjacent out-of-order elements. It is simple and visual but inefficient for large arrays."
    },
    insertion: {
        name: "Insertion Sort",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
        stable: "Yes",
        description: "Insertion Sort builds the final sorted array one element at a time. It is efficient for small or nearly sorted inputs."
    },
    selection: {
        name: "Selection Sort",
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
        stable: "No",
        description: "Selection Sort repeatedly selects the minimum element from the unsorted portion and moves it to the front."
    },
    cocktail: {
        name: "Cocktail Sort",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
        stable: "Yes",
        description: "Cocktail Sort is a bidirectional Bubble Sort that sweeps forward and backward, moving small and large elements in each pass."
    },
    shell: {
        name: "Shell Sort",
        best: "O(n log n)",
        average: "O(n(log n)²)",
        worst: "O(n(log n)²)",
        space: "O(1)",
        stable: "No",
        description: "Shell Sort generalizes Insertion Sort by comparing elements distant apart using a gap sequence, then reducing the gap."
    },
    counting: {
        name: "Counting Sort",
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n + k)",
        space: "O(n + k)",
        stable: "Yes (in this form)",
        description: "Counting Sort counts frequencies of each key in a limited range and reconstructs the sorted array based on counts."
    },
    radix: {
        name: "Radix Sort (LSD)",
        best: "O(nk)",
        average: "O(nk)",
        worst: "O(nk)",
        space: "O(n + k)",
        stable: "Yes",
        description: "Radix Sort processes keys digit by digit using a stable counting step for each digit. For bounded integers it can outperform comparison-based sorts."
    },
    bucket: {
        name: "Bucket Sort",
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n²)",
        space: "O(n + k)",
        stable: "Depends on bucket sort method",
        description: "Bucket Sort distributes elements into buckets based on their value range, sorts each bucket, and concatenates the results."
    },
    pigeonhole: {
        name: "Pigeonhole Sort",
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n + k)",
        space: "O(n + k)",
        stable: "Yes (in this form)",
        description: "Pigeonhole Sort places each key into a slot corresponding to its value and then reads slots in order. Suitable when keys map directly to a small integer range."
    },
    flash: {
        name: "Flash Sort",
        best: "O(n)",
        average: "O(n)",
        worst: "O(n²)",
        space: "O(n)",
        stable: "No",
        description: "Flash Sort classifies elements into classes based on value, moves them close to their final positions, and finishes with a local sort step."
    },
    bogo: {
        name: "Bogo Sort (real)",
        best: "O(n)",
        average: "O((n+1)!)",
        worst: "Unbounded",
        space: "O(1)",
        stable: "Random",
        description: "Bogo Sort shuffles the array until it happens to be sorted. It is not practical and should only be used on very small arrays."
    }
}

function getDelay() {
    const v = parseInt(speedSlider.value, 10)
    return 2 + (90 - v)
}

function updateSpeedLabel() {
    const v = parseInt(speedSlider.value, 10)
    if (v < 25) speedLabel.textContent = "Fast"
    else if (v < 55) speedLabel.textContent = "Medium"
    else speedLabel.textContent = "Slow"
}

function getBars() {
    return barsContainer.children
}

function setStatus(text) {
    statusLabel.textContent = text
}

function updateAlgoLabel() {
    const algo = algoSelect.value
    const type = typeSelect.value
    const algoName = algorithmInfo[algo]?.name || "Algorithm"
    const typeName = type === "best" ? "Best case" : type === "worst" ? "Worst case" : "Average case"
    algoLabel.textContent = algoName + " • " + typeName
}

function updateInfoPanel() {
    const algo = algoSelect.value
    const info = algorithmInfo[algo]
    if (!info) {
        infoContent.textContent = "Select an algorithm to see its properties."
        return
    }
    infoContent.innerHTML =
        "<div><strong>Algorithm:</strong> " + info.name + "</div>" +
        "<div><strong>Best:</strong> " + info.best + "</div>" +
        "<div><strong>Average:</strong> " + info.average + "</div>" +
        "<div><strong>Worst:</strong> " + info.worst + "</div>" +
        "<div><strong>Space:</strong> " + info.space + "</div>" +
        "<div><strong>Stable:</strong> " + info.stable + "</div>" +
        "<p>" + info.description + "</p>"
}

function resetStats() {
    stats = {
        comparisons: 0,
        swaps: 0,
        passes: 0,
        bogoShuffles: 0,
        recursiveCalls: 0,
        startTime: performance.now(),
        endTime: 0
    }
    renderStats()
}

function renderStats() {
    const size = array.length
    const elapsed = stats.endTime > stats.startTime ? ((stats.endTime - stats.startTime) / 1000).toFixed(3) + " s" : "—"
    statsContent.innerHTML =
        "<div><strong>Array size:</strong> " + size + "</div>" +
        "<div><strong>Time:</strong> " + elapsed + "</div>" +
        "<div><strong>Comparisons:</strong> " + stats.comparisons + "</div>" +
        "<div><strong>Swaps:</strong> " + stats.swaps + "</div>" +
        "<div><strong>Passes:</strong> " + stats.passes + "</div>" +
        "<div><strong>Bogo shuffles:</strong> " + stats.bogoShuffles + "</div>" +
        "<div><strong>Recursive calls:</strong> " + stats.recursiveCalls + "</div>"
}

function clearTree() {
    treeContent.innerHTML = ""
}

function treePush(text) {
    const div = document.createElement("div")
    div.textContent = "• " + text
    treeContent.appendChild(div)
    treeContent.scrollTop = treeContent.scrollHeight
}

function generateArray() {
    const size = parseInt(sizeSlider.value, 10)
    const type = typeSelect.value
    const minH = 24
    const maxH = 360
    const step = (maxH - minH) / Math.max(size - 1, 1)

    array = []
    if (type === "best") {
        for (let i = 0; i < size; i++) array.push(Math.round(minH + i * step))
    } else if (type === "worst") {
        for (let i = size - 1; i >= 0; i--) array.push(Math.round(minH + i * step))
    } else {
        for (let i = 0; i < size; i++) {
            const h = minH + Math.random() * (maxH - minH)
            array.push(Math.round(h))
        }
    }
}

function drawBars() {
    barsContainer.innerHTML = ""
    for (const value of array) {
        const bar = document.createElement("div")
        bar.className = "bar"
        bar.style.height = value + "px"
        barsContainer.appendChild(bar)
    }
}

function clearSortedClasses() {
    const bars = getBars()
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.remove("sorted")
        bars[i].classList.remove("active")
    }
}

function markSorted() {
    const bars = getBars()
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.remove("active")
        bars[i].classList.add("sorted")
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function highlight(indices, delayFactor) {
    if (isCancelled) return
    const bars = getBars()
    for (const idx of indices) {
        if (bars[idx]) bars[idx].classList.add("active")
    }
    stats.comparisons += indices.length
    renderStats()
    await sleep(getDelay() * delayFactor)
    for (const idx of indices) {
        if (bars[idx]) bars[idx].classList.remove("active")
    }
}

async function swap(arr, i, j) {
    if (isCancelled) return
    const bars = getBars()
    await highlight([i, j], 0.6)
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    if (bars[i]) bars[i].style.height = arr[i] + "px"
    if (bars[j]) bars[j].style.height = arr[j] + "px"
    stats.swaps++
    renderStats()
    await sleep(getDelay() * 0.5)
}

async function heapify(arr, n, i) {
    if (isCancelled) return
    let largest = i
    const l = 2 * i + 1
    const r = 2 * i + 2
    if (l < n && arr[l] > arr[largest]) largest = l
    if (r < n && arr[r] > arr[largest]) largest = r
    if (largest !== i) {
        treePush("Heapify at index " + i)
        await swap(arr, i, largest)
        await heapify(arr, n, largest)
    }
}

async function heapSort(arr) {
    setStatus("Heap Sort in progress...")
    const n = arr.length
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (isCancelled) return
        await heapify(arr, n, i)
    }
    for (let i = n - 1; i > 0; i--) {
        if (isCancelled) return
        await swap(arr, 0, i)
        await heapify(arr, i, 0)
    }
}

async function merge(arr, left, mid, right) {
    if (isCancelled) return
    treePush("Merge [" + left + ", " + mid + "] with [" + (mid + 1) + ", " + right + "]")
    const bars = getBars()
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0
    let j = 0
    let k = left
    while (i < leftArr.length && j < rightArr.length) {
        if (isCancelled) return
        await highlight([k], 0.4)
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i]
            i++
        } else {
            arr[k] = rightArr[j]
            j++
        }
        if (bars[k]) bars[k].style.height = arr[k] + "px"
        k++
        await sleep(getDelay() * 0.35)
    }
    while (i < leftArr.length) {
        if (isCancelled) return
        await highlight([k], 0.35)
        arr[k] = leftArr[i]
        if (bars[k]) bars[k].style.height = arr[k] + "px"
        i++
        k++
        await sleep(getDelay() * 0.3)
    }
    while (j < rightArr.length) {
        if (isCancelled) return
        await highlight([k], 0.35)
        arr[k] = rightArr[j]
        if (bars[k]) bars[k].style.height = arr[k] + "px"
        j++
        k++
        await sleep(getDelay() * 0.3)
    }
}

async function mergeSort(arr, left, right) {
    if (isCancelled) return
    if (left >= right) return
    const mid = Math.floor((left + right) / 2)
    stats.recursiveCalls++
    renderStats()
    treePush("Split [" + left + ", " + right + "] at " + mid)
    await mergeSort(arr, left, mid)
    await mergeSort(arr, mid + 1, right)
    await merge(arr, left, mid, right)
}

async function partition(arr, low, high) {
    const bars = getBars()
    const pivot = arr[high]
    let i = low
    treePush("Partition [" + low + ", " + high + "] with pivot at " + high)
    for (let j = low; j < high; j++) {
        if (isCancelled) return i
        await highlight([j, high], 0.4)
        if (arr[j] < pivot) {
            await swap(arr, i, j)
            i++
        }
    }
    await swap(arr, i, high)
    return i
}

async function quickSort(arr, low, high) {
    if (isCancelled) return
    if (low < high) {
        stats.recursiveCalls++
        renderStats()
        const pi = await partition(arr, low, high)
        await quickSort(arr, low, pi - 1)
        await quickSort(arr, pi + 1, high)
    }
}

const RUN = 32

async function insertionRun(arr, left, right) {
    const bars = getBars()
    for (let i = left + 1; i <= right; i++) {
        if (isCancelled) return
        const key = arr[i]
        let j = i - 1
        while (j >= left && arr[j] > key) {
            if (isCancelled) return
            await highlight([j, j + 1], 0.4)
            arr[j + 1] = arr[j]
            if (bars[j + 1]) bars[j + 1].style.height = arr[j + 1] + "px"
            j--
            stats.swaps++
            renderStats()
            await sleep(getDelay() * 0.3)
        }
        arr[j + 1] = key
        if (bars[j + 1]) bars[j + 1].style.height = key + "px"
        await sleep(getDelay() * 0.3)
    }
}

async function timSort(arr) {
    const n = arr.length
    setStatus("Timsort in progress...")
    for (let i = 0; i < n; i += RUN) {
        if (isCancelled) return
        treePush("Run insertion [" + i + ", " + Math.min(i + RUN - 1, n - 1) + "]")
        await insertionRun(arr, i, Math.min(i + RUN - 1, n - 1))
    }
    for (let size = RUN; size < n; size *= 2) {
        if (isCancelled) return
        for (let left = 0; left < n; left += 2 * size) {
            if (isCancelled) return
            const mid = Math.min(left + size - 1, n - 1)
            const right = Math.min(left + 2 * size - 1, n - 1)
            if (mid < right) {
                await merge(arr, left, mid, right)
            }
        }
    }
}

async function bubbleSort(arr) {
    setStatus("Bubble Sort in progress...")
    const n = arr.length
    for (let i = 0; i < n; i++) {
        if (isCancelled) return
        for (let j = 0; j < n - i - 1; j++) {
            if (isCancelled) return
            await highlight([j, j + 1], 0.4)
            if (arr[j] > arr[j + 1]) {
                await swap(arr, j, j + 1)
            }
        }
    }
}

async function insertionSort(arr) {
    setStatus("Insertion Sort in progress...")
    const bars = getBars()
    const n = arr.length
    for (let i = 1; i < n; i++) {
        if (isCancelled) return
        const key = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > key) {
            if (isCancelled) return
            await highlight([j, j + 1], 0.4)
            arr[j + 1] = arr[j]
            if (bars[j + 1]) bars[j + 1].style.height = arr[j + 1] + "px"
            j--
            stats.swaps++
            renderStats()
            await sleep(getDelay() * 0.3)
        }
        arr[j + 1] = key
        if (bars[j + 1]) bars[j + 1].style.height = key + "px"
        await sleep(getDelay() * 0.3)
    }
}

async function selectionSort(arr) {
    setStatus("Selection Sort in progress...")
    const n = arr.length
    for (let i = 0; i < n; i++) {
        if (isCancelled) return
        let minIdx = i
        for (let j = i + 1; j < n; j++) {
            if (isCancelled) return
            await highlight([minIdx, j], 0.3)
            if (arr[j] < arr[minIdx]) {
                minIdx = j
            }
        }
        if (minIdx !== i) {
            await swap(arr, i, minIdx)
        }
    }
}

async function cocktailSort(arr) {
    setStatus("Cocktail Sort in progress...")
    let start = 0
    let end = arr.length - 1
    let swapped = true
    while (swapped) {
        if (isCancelled) return
        swapped = false
        treePush("Forward sweep [" + start + ", " + end + "]")
        for (let i = start; i < end; i++) {
            if (isCancelled) return
            await highlight([i, i + 1], 0.4)
            if (arr[i] > arr[i + 1]) {
                await swap(arr, i, i + 1)
                swapped = true
            }
        }
        if (!swapped) break
        swapped = false
        end--
        treePush("Backward sweep [" + start + ", " + end + "]")
        for (let i = end; i > start; i--) {
            if (isCancelled) return
            await highlight([i - 1, i], 0.4)
            if (arr[i - 1] > arr[i]) {
                await swap(arr, i - 1, i)
                swapped = true
            }
        }
        start++
    }
}

async function shellSort(arr) {
    setStatus("Shell Sort in progress...")
    const n = arr.length
    const bars = getBars()
    let gap = Math.floor(n / 2)
    while (gap > 0) {
        treePush("Gap " + gap)
        for (let i = gap; i < n; i++) {
            if (isCancelled) return
            const temp = arr[i]
            let j = i
            while (j >= gap && arr[j - gap] > temp) {
                if (isCancelled) return
                await highlight([j, j - gap], 0.4)
                arr[j] = arr[j - gap]
                if (bars[j]) bars[j].style.height = arr[j] + "px"
                j -= gap
                stats.swaps++
                renderStats()
                await sleep(getDelay() * 0.3)
            }
            arr[j] = temp
            if (bars[j]) bars[j].style.height = temp + "px"
        }
        gap = Math.floor(gap / 2)
    }
}

async function countingSort(arr) {
    setStatus("Counting Sort in progress...")
    let minVal = Math.min(...arr)
    let maxVal = Math.max(...arr)
    const range = maxVal - minVal + 1
    const count = new Array(range).fill(0)
    const output = new Array(arr.length)
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - minVal]++
    }
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1]
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        output[--count[arr[i] - minVal]] = arr[i]
    }
    const bars = getBars()
    stats.passes++
    renderStats()
    treePush("Counting pass over range [" + minVal + ", " + maxVal + "]")
    for (let i = 0; i < arr.length; i++) {
        if (isCancelled) return
        arr[i] = output[i]
        if (bars[i]) bars[i].style.height = arr[i] + "px"
        await highlight([i], 0.2)
        await sleep(getDelay() * 0.2)
    }
}

async function countingSortByDigit(arr, exp) {
    const n = arr.length
    const output = new Array(n).fill(0)
    const count = new Array(10).fill(0)
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10
        count[digit]++
    }
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1]
    }
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit]--
    }
    const bars = getBars()
    stats.passes++
    renderStats()
    treePush("Radix digit pass exp=" + exp)
    for (let i = 0; i < n; i++) {
        if (isCancelled) return
        arr[i] = output[i]
        if (bars[i]) bars[i].style.height = arr[i] + "px"
        await highlight([i], 0.2)
        await sleep(getDelay() * 0.2)
    }
}

async function radixSort(arr) {
    setStatus("Radix Sort in progress...")
    let maxVal = Math.max(...arr)
    let exp = 1
    while (Math.floor(maxVal / exp) > 0) {
        if (isCancelled) return
        await countingSortByDigit(arr, exp)
        exp *= 10
    }
}

async function bucketSort(arr) {
    setStatus("Bucket Sort in progress...")
    const n = arr.length
    const maxVal = Math.max(...arr)
    const minVal = Math.min(...arr)
    const range = maxVal - minVal || 1
    const bucketCount = Math.max(5, Math.floor(Math.sqrt(n)))
    const buckets = new Array(bucketCount).fill(0).map(() => [])
    for (let i = 0; i < n; i++) {
        const normalized = (arr[i] - minVal) / range
        let idx = Math.floor(normalized * bucketCount)
        if (idx === bucketCount) idx = bucketCount - 1
        buckets[idx].push(arr[i])
    }
    const bars = getBars()
    stats.passes++
    renderStats()
    for (let b = 0; b < bucketCount; b++) {
        treePush("Sort bucket " + b + " (" + buckets[b].length + " items)")
        for (let i = 1; i < buckets[b].length; i++) {
            const key = buckets[b][i]
            let j = i - 1
            while (j >= 0 && buckets[b][j] > key) {
                buckets[b][j + 1] = buckets[b][j]
                j--
            }
            buckets[b][j + 1] = key
        }
    }
    let index = 0
    for (let b = 0; b < bucketCount; b++) {
        for (let i = 0; i < buckets[b].length; i++) {
            if (isCancelled) return
            arr[index] = buckets[b][i]
            if (bars[index]) bars[index].style.height = arr[index] + "px"
            await highlight([index], 0.2)
            await sleep(getDelay() * 0.2)
            index++
        }
    }
}

async function pigeonholeSort(arr) {
    setStatus("Pigeonhole Sort in progress...")
    let minVal = Math.min(...arr)
    let maxVal = Math.max(...arr)
    const range = maxVal - minVal + 1
    const holes = new Array(range).fill(0).map(() => [])
    for (let i = 0; i < arr.length; i++) {
        holes[arr[i] - minVal].push(arr[i])
    }
    const bars = getBars()
    stats.passes++
    renderStats()
    treePush("Distribute into " + range + " holes")
    let index = 0
    for (let i = 0; i < range; i++) {
        for (let j = 0; j < holes[i].length; j++) {
            if (isCancelled) return
            arr[index] = holes[i][j]
            if (bars[index]) bars[index].style.height = arr[index] + "px"
            await highlight([index], 0.2)
            await sleep(getDelay() * 0.2)
            index++
        }
    }
}

async function flashSort(arr) {
    setStatus("Flash Sort in progress...")
    const n = arr.length
    if (n <= 1) return
    let minVal = arr[0]
    let maxVal = arr[0]
    let maxIdx = 0
    for (let i = 1; i < n; i++) {
        if (arr[i] < minVal) minVal = arr[i]
        if (arr[i] > maxVal) {
            maxVal = arr[i]
            maxIdx = i
        }
    }
    if (minVal === maxVal) return
    let m = Math.floor(0.43 * n)
    if (m < 2) m = 2
    const L = new Array(m).fill(0)
    const c1 = (m - 1) / (maxVal - minVal)
    for (let i = 0; i < n; i++) {
        const k = Math.floor(c1 * (arr[i] - minVal))
        L[k]++
    }
    for (let k = 1; k < m; k++) {
        L[k] += L[k - 1]
    }
    const bars = getBars()
    await swap(arr, maxIdx, 0)
    let move = 0
    let j = 0
    let k = m - 1
    treePush("Classification into " + m + " classes")
    while (move < n - 1) {
        if (isCancelled) return
        while (j > L[k] - 1) {
            j++
            k = Math.floor(c1 * (arr[j] - minVal))
            if (isCancelled) return
        }
        let evicted = arr[j]
        while (j !== L[k]) {
            if (isCancelled) return
            k = Math.floor(c1 * (evicted - minVal))
            const idx = L[k] - 1
            const temp = arr[idx]
            arr[idx] = evicted
            evicted = temp
            L[k]--
            move++
            if (bars[idx]) bars[idx].style.height = arr[idx] + "px"
            await highlight([idx], 0.2)
            await sleep(getDelay() * 0.15)
        }
    }
    treePush("Final insertion pass")
    for (let i = 1; i < n; i++) {
        if (isCancelled) return
        const key = arr[i]
        let j2 = i - 1
        while (j2 >= 0 && arr[j2] > key) {
            if (isCancelled) return
            await highlight([j2, j2 + 1], 0.3)
            arr[j2 + 1] = arr[j2]
            if (bars[j2 + 1]) bars[j2 + 1].style.height = arr[j2 + 1] + "px"
            j2--
            stats.swaps++
            renderStats()
            await sleep(getDelay() * 0.25)
        }
        arr[j2 + 1] = key
        if (bars[j2 + 1]) bars[j2 + 1].style.height = key + "px"
    }
}

function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false
    }
    return true
}

function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
}

async function bogoSort(arr) {
    setStatus("Bogo Sort in progress...")
    const bars = getBars()
    let attempts = 0
    while (!isSorted(arr)) {
        if (isCancelled) {
            setStatus("Bogo Sort cancelled after " + attempts + " shuffles.")
            return
        }
        shuffleInPlace(arr)
        attempts++
        stats.bogoShuffles++
        renderStats()
        for (let i = 0; i < arr.length; i++) {
            if (bars[i]) bars[i].style.height = arr[i] + "px"
        }
        const idx = Math.floor(Math.random() * arr.length)
        await highlight([idx], 0.2)
        await sleep(getDelay())
        if (attempts % 50 === 0) {
            setStatus("Bogo Sort shuffles: " + attempts)
        }
    }
    setStatus("Bogo Sort finished after " + attempts + " shuffles.")
}

async function startSort() {
    if (isSorting) return
    const algo = algoSelect.value
    if (algo === "bogo" && array.length > 12) {
        const proceed = window.confirm("Bogo Sort can take an extremely long time on large arrays. It is recommended to use size ≤ 10. Do you want to proceed?")
        if (!proceed) return
    }
    isSorting = true
    isCancelled = false
    clearSortedClasses()
    clearTree()
    resetStats()
    btnStart.disabled = true
    btnGenerate.disabled = true
    btnReset.disabled = true
    sizeSlider.disabled = true
    typeSelect.disabled = true
    algoSelect.disabled = true
    btnStop.disabled = false
    updateAlgoLabel()
    updateInfoPanel()
    try {
        if (algo === "merge") {
            setStatus("Merge Sort in progress...")
            await mergeSort(array, 0, array.length - 1)
        } else if (algo === "quick") {
            setStatus("Quick Sort in progress...")
            await quickSort(array, 0, array.length - 1)
        } else if (algo === "heap") {
            await heapSort(array)
        } else if (algo === "tim") {
            await timSort(array)
        } else if (algo === "bubble") {
            await bubbleSort(array)
        } else if (algo === "insertion") {
            await insertionSort(array)
        } else if (algo === "selection") {
            await selectionSort(array)
        } else if (algo === "cocktail") {
            await cocktailSort(array)
        } else if (algo === "shell") {
            await shellSort(array)
        } else if (algo === "counting") {
            await countingSort(array)
        } else if (algo === "radix") {
            await radixSort(array)
        } else if (algo === "bucket") {
            await bucketSort(array)
        } else if (algo === "pigeonhole") {
            await pigeonholeSort(array)
        } else if (algo === "flash") {
            await flashSort(array)
        } else if (algo === "bogo") {
            await bogoSort(array)
        }
        stats.endTime = performance.now()
        renderStats()
        if (isCancelled) {
            setStatus("Sorting cancelled.")
        } else {
            setStatus("Completed. Array is sorted.")
            markSorted()
        }
    } catch (e) {
        setStatus("Error during sorting.")
        console.error(e)
    }
    isSorting = false
    isCancelled = false
    btnStart.disabled = false
    btnGenerate.disabled = false
    btnReset.disabled = false
    sizeSlider.disabled = false
    typeSelect.disabled = false
    algoSelect.disabled = false
    btnStop.disabled = true
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    if (theme === "dark") {
        themeIcon.textContent = "●"
        themeText.textContent = "Dark"
    } else {
        themeIcon.textContent = "○"
        themeText.textContent = "Light"
    }
    try {
        localStorage.setItem("sorting-visualizer-theme", theme)
    } catch (e) {}
}

function initTheme() {
    let stored = null
    try {
        stored = localStorage.getItem("sorting-visualizer-theme")
    } catch (e) {}
    const theme = stored === "light" ? "light" : "dark"
    applyTheme(theme)
}

function init() {
    initTheme()
    sizeValue.textContent = sizeSlider.value
    updateSpeedLabel()
    generateArray()
    drawBars()
    updateAlgoLabel()
    updateInfoPanel()
    renderStats()
    btnStop.disabled = true
    setStatus("Ready.")
}

sizeSlider.addEventListener("input", () => {
    sizeValue.textContent = sizeSlider.value
    if (!isSorting) {
        generateArray()
        drawBars()
        clearSortedClasses
    }
})

typeSelect.addEventListener("change", () => {
    if (!isSorting) {
        generateArray()
        drawBars()
        clearSortedClasses()
        updateAlgoLabel()
        updateInfoPanel()
    }
})

algoSelect.addEventListener("change", () => {
    if (!isSorting) {
        updateAlgoLabel()
        updateInfoPanel()
    }
})

speedSlider.addEventListener("input", () => {
    updateSpeedLabel()
})

btnGenerate.addEventListener("click", () => {
    if (isSorting) return
    generateArray()
    drawBars()
    clearTree()
    resetStats()
    clearSortedClasses()
    setStatus("Array regenerated.")
})

btnStart.addEventListener("click", () => {
    if (!isSorting) startSort()
})

btnStop.addEventListener("click", () => {
    if (!isSorting) return
    isCancelled = true
    btnStop.disabled = true
    setStatus("Stopping...")
})

btnReset.addEventListener("click", () => {
    if (isSorting) return
    generateArray()
    drawBars()
    clearSortedClasses()
    clearTree()
    resetStats()
    setStatus("Reset.")
})

themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme")
    applyTheme(current === "dark" ? "light" : "dark")
})

window.addEventListener("resize", () => {
    
    if (!isSorting) {
        drawBars()
        clearSortedClasses()
    }
})

document.addEventListener("DOMContentLoaded", init)
