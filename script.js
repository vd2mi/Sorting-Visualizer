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
const codeBox = document.getElementById("codeBox");
const codeLang = document.getElementById("codeLang");
const copyCode = document.getElementById("copyCode");

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
const algoCode = {
    merge: {
        python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
        javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result
    .concat(left.slice(i))
    .concat(right.slice(j));
}`,
        cpp: `#include <vector>
using namespace std;

void merge(vector<int>& a, int l, int m, int r) {
    vector<int> left(a.begin() + l, a.begin() + m + 1);
    vector<int> right(a.begin() + m + 1, a.begin() + r + 1);

    int i = 0, j = 0, k = l;
    while (i < (int)left.size() && j < (int)right.size()) {
        if (left[i] <= right[j]) {
            a[k++] = left[i++];
        } else {
            a[k++] = right[j++];
        }
    }
    while (i < (int)left.size()) {
        a[k++] = left[i++];
    }
    while (j < (int)right.size()) {
        a[k++] = right[j++];
    }
}

void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
}`,
        java: `void merge(int[] a, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    int[] left = new int[n1];
    int[] right = new int[n2];

    System.arraycopy(a, l, left, 0, n1);
    System.arraycopy(a, m + 1, right, 0, n2);

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            a[k++] = left[i++];
        } else {
            a[k++] = right[j++];
        }
    }
    while (i < n1) {
        a[k++] = left[i++];
    }
    while (j < n2) {
        a[k++] = right[j++];
    }
}

void mergeSort(int[] a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
}`
    },

    quick: {
        python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        p = partition(arr, low, high)
        quick_sort(arr, low, p - 1)
        quick_sort(arr, p + 1, high)


def partition(arr, low, high):
    pivot = arr[high]
    i = low

    for j in range(low, high):
        if arr[j] <= pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1

    arr[i], arr[high] = arr[high], arr[i]
    return i`,
        javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}`,
        cpp: `#include <vector>
using namespace std;

int partition(vector<int>& a, int low, int high) {
    int pivot = a[high];
    int i = low;

    for (int j = low; j < high; ++j) {
        if (a[j] <= pivot) {
            swap(a[i], a[j]);
            ++i;
        }
    }
    swap(a[i], a[high]);
    return i;
}

void quickSort(vector<int>& a, int low, int high) {
    if (low < high) {
        int p = partition(a, low, high);
        quickSort(a, low, p - 1);
        quickSort(a, p + 1, high);
    }
}`,
        java: `int partition(int[] a, int low, int high) {
    int pivot = a[high];
    int i = low;

    for (int j = low; j < high; j++) {
        if (a[j] <= pivot) {
            int tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
            i++;
        }
    }

    int tmp = a[i];
    a[i] = a[high];
    a[high] = tmp;

    return i;
}

void quickSort(int[] a, int low, int high) {
    if (low < high) {
        int p = partition(a, low, high);
        quickSort(a, low, p - 1);
        quickSort(a, p + 1, high);
    }
}`
    },

    heap: {
        python: `def heap_sort(arr):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)


def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2

    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
        javascript: `function heapSort(arr) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
        cpp: `#include <vector>
using namespace std;

void heapify(vector<int>& a, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;

    if (largest != i) {
        swap(a[i], a[largest]);
        heapify(a, n, largest);
    }
}

void heapSort(vector<int>& a) {
    int n = (int)a.size();

    for (int i = n / 2 - 1; i >= 0; --i) {
        heapify(a, n, i);
    }

    for (int i = n - 1; i > 0; --i) {
        swap(a[0], a[i]);
        heapify(a, i, 0);
    }
}`,
        java: `void heapify(int[] a, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;

    if (largest != i) {
        int tmp = a[i];
        a[i] = a[largest];
        a[largest] = tmp;
        heapify(a, n, largest);
    }
}

void heapSort(int[] a) {
    int n = a.length;

    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(a, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int tmp = a[0];
        a[0] = a[i];
        a[i] = tmp;
        heapify(a, i, 0);
    }
}`
    },

    tim: {
        // Simplified but full Timsort-style implementation
        python: `RUN = 32


def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key


def merge(arr, l, m, r):
    left = arr[l:m + 1]
    right = arr[m + 1:r + 1]

    i = j = 0
    k = l
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1

    while i < len(left):
        arr[k] = left[i]
        i += 1
        k += 1

    while j < len(right):
        arr[k] = right[j]
        j += 1
        k += 1


def timsort(arr):
    n = len(arr)

    for i in range(0, n, RUN):
        insertion_sort(arr, i, min(i + RUN - 1, n - 1))

    size = RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2`,
        javascript: `const RUN = 32;

function insertionSortRun(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

function mergeRuns(arr, l, m, r) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
  }

  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}

function timSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n; i += RUN) {
    insertionSortRun(arr, i, Math.min(i + RUN - 1, n - 1));
  }

  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        mergeRuns(arr, left, mid, right);
      }
    }
  }
  return arr;
}`,
        cpp: `#include <vector>
using namespace std;

const int RUN = 32;

void insertionSortRun(vector<int>& a, int left, int right) {
    for (int i = left + 1; i <= right; ++i) {
        int key = a[i];
        int j = i - 1;
        while (j >= left && a[j] > key) {
            a[j + 1] = a[j];
            --j;
        }
        a[j + 1] = key;
    }
}

void mergeRuns(vector<int>& a, int l, int m, int r) {
    vector<int> left(a.begin() + l, a.begin() + m + 1);
    vector<int> right(a.begin() + m + 1, a.begin() + r + 1);

    int i = 0, j = 0, k = l;

    while (i < (int)left.size() && j < (int)right.size()) {
        if (left[i] <= right[j]) {
            a[k++] = left[i++];
        } else {
            a[k++] = right[j++];
        }
    }
    while (i < (int)left.size()) a[k++] = left[i++];
    while (j < (int)right.size()) a[k++] = right[j++];
}

void timSort(vector<int>& a) {
    int n = (int)a.size();

    for (int i = 0; i < n; i += RUN) {
        int right = min(i + RUN - 1, n - 1);
        insertionSortRun(a, i, right);
    }

    for (int size = RUN; size < n; size *= 2) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = min(left + size - 1, n - 1);
            int right = min(left + 2 * size - 1, n - 1);
            if (mid < right) {
                mergeRuns(a, left, mid, right);
            }
        }
    }
}`,
        java: `class TimSort {
    private static final int RUN = 32;

    private static void insertionSortRun(int[] a, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= left && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
    }

    private static void mergeRuns(int[] a, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;

        int[] left = new int[n1];
        int[] right = new int[n2];

        System.arraycopy(a, l, left, 0, n1);
        System.arraycopy(a, m + 1, right, 0, n2);

        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (left[i] <= right[j]) {
                a[k++] = left[i++];
            } else {
                a[k++] = right[j++];
            }
        }
        while (i < n1) a[k++] = left[i++];
        while (j < n2) a[k++] = right[j++];
    }

    public static void timSort(int[] a) {
        int n = a.length;

        for (int i = 0; i < n; i += RUN) {
            int right = Math.min(i + RUN - 1, n - 1);
            insertionSortRun(a, i, right);
        }

        for (int size = RUN; size < n; size *= 2) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = Math.min(left + size - 1, n - 1);
                int right = Math.min(left + 2 * size - 1, n - 1);
                if (mid < right) {
                    mergeRuns(a, left, mid, right);
                }
            }
        }
    }
}`
    },

    bubble: {
        python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
        javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
        cpp: `#include <vector>
using namespace std;

void bubbleSort(vector<int>& a) {
    int n = (int)a.size();
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n - i - 1; ++j) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
            }
        }
    }
}`,
        java: `void bubbleSort(int[] a) {
    int n = a.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                int tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
            }
        }
    }
}`
    },

    insertion: {
        python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
        javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
        cpp: `#include <vector>
using namespace std;

void insertionSort(vector<int>& a) {
    for (int i = 1; i < (int)a.size(); ++i) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            --j;
        }
        a[j + 1] = key;
    }
}`,
        java: `void insertionSort(int[] a) {
    for (int i = 1; i < a.length; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}`
    },

    selection: {
        python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
        javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
        cpp: `#include <vector>
using namespace std;

void selectionSort(vector<int>& a) {
    int n = (int)a.size();
    for (int i = 0; i < n; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j) {
            if (a[j] < a[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(a[i], a[minIdx]);
        }
    }
}`,
        java: `void selectionSort(int[] a) {
    int n = a.length;
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int tmp = a[i];
            a[i] = a[minIdx];
            a[minIdx] = tmp;
        }
    }
}`
    },

    cocktail: {
        python: `def cocktail_sort(arr):
    n = len(arr)
    start = 0
    end = n - 1
    swapped = True

    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped:
            break
        swapped = False
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1`,
        javascript: `function cocktailSort(arr) {
  let start = 0;
  let end = arr.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    start++;
  }
  return arr;
}`,
        cpp: `#include <vector>
using namespace std;

void cocktailSort(vector<int>& a) {
    bool swapped = true;
    int start = 0;
    int end = (int)a.size() - 1;

    while (swapped) {
        swapped = false;
        for (int i = start; i < end; ++i) {
            if (a[i] > a[i + 1]) {
                swap(a[i], a[i + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        --end;
        for (int i = end - 1; i >= start; --i) {
            if (a[i] > a[i + 1]) {
                swap(a[i], a[i + 1]);
                swapped = true;
            }
        }
        ++start;
    }
}`,
        java: `void cocktailSort(int[] a) {
    boolean swapped = true;
    int start = 0;
    int end = a.length - 1;

    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++) {
            if (a[i] > a[i + 1]) {
                int tmp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (int i = end - 1; i >= start; i--) {
            if (a[i] > a[i + 1]) {
                int tmp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = tmp;
                swapped = true;
            }
        }
        start++;
    }
}`
    },

    shell: {
        python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2`,
        javascript: `function shellSort(arr) {
  const n = arr.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}`,
        cpp: `#include <vector>
using namespace std;

void shellSort(vector<int>& a) {
    int n = (int)a.size();
    int gap = n / 2;

    while (gap > 0) {
        for (int i = gap; i < n; ++i) {
            int temp = a[i];
            int j = i;
            while (j >= gap && a[j - gap] > temp) {
                a[j] = a[j - gap];
                j -= gap;
            }
            a[j] = temp;
        }
        gap /= 2;
    }
}`,
        java: `void shellSort(int[] a) {
    int n = a.length;
    int gap = n / 2;

    while (gap > 0) {
        for (int i = gap; i < n; i++) {
            int temp = a[i];
            int j = i;
            while (j >= gap && a[j - gap] > temp) {
                a[j] = a[j - gap];
                j -= gap;
            }
            a[j] = temp;
        }
        gap /= 2;
    }
}`
    },

    counting: {
        python: `def counting_sort(arr):
    if not arr:
        return arr

    min_val = min(arr)
    max_val = max(arr)
    k = max_val - min_val + 1

    count = [0] * k
    output = [0] * len(arr)

    for x in arr:
        count[x - min_val] += 1

    for i in range(1, k):
        count[i] += count[i - 1]

    for x in reversed(arr):
        count[x - min_val] -= 1
        output[count[x - min_val]] = x

    for i in range(len(arr)):
        arr[i] = output[i]`,
        javascript: `function countingSort(arr) {
  if (!arr.length) return arr;

  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  const range = maxVal - minVal + 1;

  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  for (const x of arr) count[x - minVal]++;

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const x = arr[i];
    const idx = x - minVal;
    count[idx]--;
    output[count[idx]] = x;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
  return arr;
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

void countingSort(vector<int>& a) {
    if (a.empty()) return;

    int minVal = *min_element(a.begin(), a.end());
    int maxVal = *max_element(a.begin(), a.end());
    int range = maxVal - minVal + 1;

    vector<int> count(range, 0), output(a.size());

    for (int x : a) count[x - minVal]++;

    for (int i = 1; i < range; ++i) {
        count[i] += count[i - 1];
    }

    for (int i = (int)a.size() - 1; i >= 0; --i) {
        int idx = a[i] - minVal;
        count[idx]--;
        output[count[idx]] = a[i];
    }

    a = output;
}`,
        java: `void countingSort(int[] a) {
    if (a.length == 0) return;

    int minVal = a[0], maxVal = a[0];
    for (int x : a) {
        if (x < minVal) minVal = x;
        if (x > maxVal) maxVal = x;
    }
    int range = maxVal - minVal + 1;

    int[] count = new int[range];
    int[] output = new int[a.length];

    for (int x : a) count[x - minVal]++;

    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    for (int i = a.length - 1; i >= 0; i--) {
        int idx = a[i] - minVal;
        count[idx]--;
        output[count[idx]] = a[i];
    }

    System.arraycopy(output, 0, a, 0, a.length);
}`
    },

    radix: {
        python: `def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for x in arr:
        index = x // exp
        count[index % 10] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    for i in range(n - 1, -1, -1):
        index = arr[i] // exp
        digit = index % 10
        count[digit] -= 1
        output[count[digit]] = arr[i]

    for i in range(n):
        arr[i] = output[i]


def radix_sort(arr):
    if not arr:
        return

    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10`,
        javascript: `function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]--;
    output[count[digit]] = arr[i];
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

function radixSort(arr) {
  if (!arr.length) return arr;

  let maxVal = Math.max(...arr);
  let exp = 1;

  while (Math.floor(maxVal / exp) > 0) {
    countingSortByDigit(arr, exp);
    exp *= 10;
  }
  return arr;
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

void countingSortByDigit(vector<int>& a, int exp) {
    int n = (int)a.size();
    vector<int> output(n);
    int count[10] = {0};

    for (int i = 0; i < n; ++i) {
        int digit = (a[i] / exp) % 10;
        count[digit]++;
    }

    for (int i = 1; i < 10; ++i) {
        count[i] += count[i - 1];
    }

    for (int i = n - 1; i >= 0; --i) {
        int digit = (a[i] / exp) % 10;
        count[digit]--;
        output[count[digit]] = a[i];
    }

    a = output;
}

void radixSort(vector<int>& a) {
    if (a.empty()) return;
    int maxVal = *max_element(a.begin(), a.end());
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByDigit(a, exp);
    }
}`,
        java: `void countingSortByDigit(int[] a, int exp) {
    int n = a.length;
    int[] output = new int[n];
    int[] count = new int[10];

    for (int value : a) {
        int digit = (value / exp) % 10;
        count[digit]++;
    }

    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (int i = n - 1; i >= 0; i--) {
        int digit = (a[i] / exp) % 10;
        count[digit]--;
        output[count[digit]] = a[i];
    }

    System.arraycopy(output, 0, a, 0, n);
}

void radixSort(int[] a) {
    if (a.length == 0) return;

    int maxVal = a[0];
    for (int x : a) if (x > maxVal) maxVal = x;

    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByDigit(a, exp);
    }
}`
    },

    bucket: {
        python: `def bucket_sort(arr):
    if not arr:
        return

    n = len(arr)
    num_buckets = max(5, int(n ** 0.5))
    buckets = [[] for _ in range(num_buckets)]

    min_val, max_val = min(arr), max(arr)
    if min_val == max_val:
        return

    range_val = max_val - min_val

    for x in arr:
        idx = int((x - min_val) / range_val * (num_buckets - 1))
        buckets[idx].append(x)

    idx = 0
    for bucket in buckets:
        bucket.sort()
        for x in bucket:
            arr[idx] = x
            idx += 1`,
        javascript: `function bucketSort(arr) {
  if (!arr.length) return arr;

  const n = arr.length;
  const numBuckets = Math.max(5, Math.floor(Math.sqrt(n)));
  const buckets = Array.from({ length: numBuckets }, () => []);

  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  if (minVal === maxVal) return arr;

  const range = maxVal - minVal;

  for (const x of arr) {
    let idx = Math.floor(((x - minVal) / range) * (numBuckets - 1));
    buckets[idx].push(x);
  }

  let index = 0;
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
    for (const x of bucket) {
      arr[index++] = x;
    }
  }
  return arr;
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

void bucketSort(vector<int>& a) {
    if (a.empty()) return;

    int n = (int)a.size();
    int numBuckets = max(5, (int)sqrt(n));

    int minVal = *min_element(a.begin(), a.end());
    int maxVal = *max_element(a.begin(), a.end());
    if (minVal == maxVal) return;

    double range = (double)(maxVal - minVal);
    vector<vector<int>> buckets(numBuckets);

    for (int x : a) {
        int idx = (int)((x - minVal) / range * (numBuckets - 1));
        buckets[idx].push_back(x);
    }

    int index = 0;
    for (auto& bucket : buckets) {
        sort(bucket.begin(), bucket.end());
        for (int x : bucket) {
            a[index++] = x;
        }
    }
}`,
        java: `void bucketSort(int[] a) {
    if (a.length == 0) return;

    int n = a.length;
    int numBuckets = Math.max(5, (int)Math.sqrt(n));

    int minVal = a[0], maxVal = a[0];
    for (int x : a) {
        if (x < minVal) minVal = x;
        if (x > maxVal) maxVal = x;
    }
    if (minVal == maxVal) return;

    double range = maxVal - minVal;
    @SuppressWarnings("unchecked")
    java.util.List<Integer>[] buckets = new java.util.List[numBuckets];
    for (int i = 0; i < numBuckets; i++) {
        buckets[i] = new java.util.ArrayList<>();
    }

    for (int x : a) {
        int idx = (int)((x - minVal) / range * (numBuckets - 1));
        buckets[idx].add(x);
    }

    int index = 0;
    for (java.util.List<Integer> bucket : buckets) {
        java.util.Collections.sort(bucket);
        for (int x : bucket) {
            a[index++] = x;
        }
    }
}`
    },

    pigeonhole: {
        python: `def pigeonhole_sort(arr):
    if not arr:
        return

    min_val = min(arr)
    max_val = max(arr)
    size = max_val - min_val + 1

    holes = [[] for _ in range(size)]

    for x in arr:
        holes[x - min_val].append(x)

    idx = 0
    for bucket in holes:
        for x in bucket:
            arr[idx] = x
            idx += 1`,
        javascript: `function pigeonholeSort(arr) {
  if (!arr.length) return arr;

  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  const size = maxVal - minVal + 1;

  const holes = Array.from({ length: size }, () => []);

  for (const x of arr) {
    holes[x - minVal].push(x);
  }

  let index = 0;
  for (const bucket of holes) {
    for (const x of bucket) {
      arr[index++] = x;
    }
  }
  return arr;
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

void pigeonholeSort(vector<int>& a) {
    if (a.empty()) return;

    int minVal = *min_element(a.begin(), a.end());
    int maxVal = *max_element(a.begin(), a.end());
    int size = maxVal - minVal + 1;

    vector<vector<int>> holes(size);
    for (int x : a) {
        holes[x - minVal].push_back(x);
    }

    int index = 0;
    for (auto& bucket : holes) {
        for (int x : bucket) {
            a[index++] = x;
        }
    }
}`,
        java: `void pigeonholeSort(int[] a) {
    if (a.length == 0) return;

    int minVal = a[0], maxVal = a[0];
    for (int x : a) {
        if (x < minVal) minVal = x;
        if (x > maxVal) maxVal = x;
    }
    int size = maxVal - minVal + 1;

    @SuppressWarnings("unchecked")
    java.util.List<Integer>[] holes = new java.util.List[size];
    for (int i = 0; i < size; i++) {
        holes[i] = new java.util.ArrayList<>();
    }

    for (int x : a) {
        holes[x - minVal].add(x);
    }

    int index = 0;
    for (java.util.List<Integer> bucket : holes) {
        for (int x : bucket) {
            a[index++] = x;
        }
    }
}`
    },

    flash: {
        python: `def flash_sort(arr):
    n = len(arr)
    if n <= 1:
        return

    m = max(2, int(0.43 * n))
    min_val = min(arr)
    max_val = max(arr)
    if min_val == max_val:
        return

    c1 = (m - 1) / (max_val - min_val)
    L = [0] * m

    for x in arr:
        k = int(c1 * (x - min_val))
        L[k] += 1

    for i in range(1, m):
        L[i] += L[i - 1]

    arr[0], arr[arr.index(max_val)] = arr[arr.index(max_val)], arr[0]

    move = 0
    j = 0
    k = m - 1

    while move < n - 1:
        while j > L[k] - 1:
            j += 1
            k = int(c1 * (arr[j] - min_val))
        evicted = arr[j]
        while j != L[k]:
            k = int(c1 * (evicted - min_val))
            dest = L[k] - 1
            arr[dest], evicted = evicted, arr[dest]
            L[k] -= 1
            move += 1

    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
        javascript: `function flashSort(arr) {
  const n = arr.length;
  if (n <= 1) return arr;

  let minVal = arr[0], maxVal = arr[0], maxIdx = 0;
  for (let i = 1; i < n; i++) {
    if (arr[i] < minVal) minVal = arr[i];
    if (arr[i] > maxVal) {
      maxVal = arr[i];
      maxIdx = i;
    }
  }
  if (minVal === maxVal) return arr;

  let m = Math.max(2, Math.floor(0.43 * n));
  const L = new Array(m).fill(0);
  const c1 = (m - 1) / (maxVal - minVal);

  for (let i = 0; i < n; i++) {
    const k = Math.floor(c1 * (arr[i] - minVal));
    L[k]++;
  }

  for (let i = 1; i < m; i++) {
    L[i] += L[i - 1];
  }

  [arr[0], arr[maxIdx]] = [arr[maxIdx], arr[0]];

  let move = 0;
  let j = 0;
  let k = m - 1;

  while (move < n - 1) {
    while (j > L[k] - 1) {
      j++;
      k = Math.floor(c1 * (arr[j] - minVal));
    }
    let evicted = arr[j];
    while (j !== L[k]) {
      k = Math.floor(c1 * (evicted - minVal));
      const dest = L[k] - 1;
      const temp = arr[dest];
      arr[dest] = evicted;
      evicted = temp;
      L[k]--;
      move++;
    }
  }

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j2 = i - 1;
    while (j2 >= 0 && arr[j2] > key) {
      arr[j2 + 1] = arr[j2];
      j2--;
    }
    arr[j2 + 1] = key;
  }
  return arr;
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

void flashSort(vector<int>& a) {
    int n = (int)a.size();
    if (n <= 1) return;

    int minVal = a[0], maxVal = a[0], maxIdx = 0;
    for (int i = 1; i < n; ++i) {
        if (a[i] < minVal) minVal = a[i];
        if (a[i] > maxVal) {
            maxVal = a[i];
            maxIdx = i;
        }
    }
    if (minVal == maxVal) return;

    int m = max(2, (int)(0.43 * n));
    vector<int> L(m, 0);
    double c1 = (double)(m - 1) / (maxVal - minVal);

    for (int i = 0; i < n; ++i) {
        int k = (int)(c1 * (a[i] - minVal));
        L[k]++;
    }
    for (int i = 1; i < m; ++i) {
        L[i] += L[i - 1];
    }

    swap(a[0], a[maxIdx]);

    int move = 0, j = 0, k = m - 1;
    while (move < n - 1) {
        while (j > L[k] - 1) {
            j++;
            k = (int)(c1 * (a[j] - minVal));
        }
        int evicted = a[j];
        while (j != L[k]) {
            k = (int)(c1 * (evicted - minVal));
            int dest = L[k] - 1;
            int temp = a[dest];
            a[dest] = evicted;
            evicted = temp;
            L[k]--;
            move++;
        }
    }

    for (int i = 1; i < n; ++i) {
        int key = a[i];
        int j2 = i - 1;
        while (j2 >= 0 && a[j2] > key) {
            a[j2 + 1] = a[j2];
            j2--;
        }
        a[j2 + 1] = key;
    }
}`,
        java: `void flashSort(int[] a) {
    int n = a.length;
    if (n <= 1) return;

    int minVal = a[0], maxVal = a[0], maxIdx = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] < minVal) minVal = a[i];
        if (a[i] > maxVal) {
            maxVal = a[i];
            maxIdx = i;
        }
    }
    if (minVal == maxVal) return;

    int m = Math.max(2, (int)(0.43 * n));
    int[] L = new int[m];
    double c1 = (double)(m - 1) / (maxVal - minVal);

    for (int x : a) {
        int k = (int)(c1 * (x - minVal));
        L[k]++;
    }
    for (int i = 1; i < m; i++) {
        L[i] += L[i - 1];
    }

    int tmp = a[0];
    a[0] = a[maxIdx];
    a[maxIdx] = tmp;

    int move = 0;
    int j = 0;
    int k = m - 1;

    while (move < n - 1) {
        while (j > L[k] - 1) {
            j++;
            k = (int)(c1 * (a[j] - minVal));
        }
        int evicted = a[j];
        while (j != L[k]) {
            k = (int)(c1 * (evicted - minVal));
            int dest = L[k] - 1;
            int t = a[dest];
            a[dest] = evicted;
            evicted = t;
            L[k]--;
            move++;
        }
    }

    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j2 = i - 1;
        while (j2 >= 0 && a[j2] > key) {
            a[j2 + 1] = a[j2];
            j2--;
        }
        a[j2 + 1] = key;
    }
}`
    },

    bogo: {
        python: `import random


def is_sorted(arr):
    return all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))


def bogo_sort(arr):
    while not is_sorted(arr):
        random.shuffle(arr)`,
        javascript: `function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

function bogoSort(arr) {
  while (!isSorted(arr)) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr;
}`,
        cpp: `#include <vector>
#include <algorithm>
#include <random>
using namespace std;

bool isSorted(const vector<int>& a) {
    for (size_t i = 1; i < a.size(); ++i) {
        if (a[i] < a[i - 1]) return false;
    }
    return true;
}

void bogoSort(vector<int>& a) {
    static random_device rd;
    static mt19937 gen(rd());

    while (!isSorted(a)) {
        shuffle(a.begin(), a.end(), gen);
    }
}`,
        java: `boolean isSorted(int[] a) {
    for (int i = 1; i < a.length; i++) {
        if (a[i] < a[i - 1]) return false;
    }
    return true;
}

void bogoSort(int[] a) {
    java.util.Random rand = new java.util.Random();
    while (!isSorted(a)) {
        for (int i = a.length - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            int tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
    }
}`
    }
};


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
function normalizeIndentation(code) {
    let lines = code.replace(/\t/g, "    ").split("\n");


    while (lines.length && lines[0].trim() === "") lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();


    let minIndent = Infinity;
    for (let line of lines) {
        if (!line.trim()) continue; 
        const match = line.match(/^(\s*)/);
        if (match) {
            minIndent = Math.min(minIndent, match[1].length);
        }
    }

    if (!isFinite(minIndent)) minIndent = 0;

    return lines.map(line => line.slice(minIndent)).join("\n");
}

function updateCodeBox() {
    const algo = algoSelect.value;
    const lang = codeLang.value;

    if (algoCode[algo] && algoCode[algo][lang]) {
        let rawCode = algoCode[algo][lang];
        rawCode = normalizeIndentation(rawCode);

        codeBox.textContent = rawCode;

        if (window.Prism) {
            codeBox.className = "language-" + lang;
            Prism.highlightElement(codeBox);
        }
    } else {
        codeBox.textContent = "// Code coming soon for this language.";
    }
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
    updateCodeBox();
    btnStop.disabled = true
    setStatus("Ready.")
}
codeLang.addEventListener("change", updateCodeBox);

copyCode.addEventListener("click", () => {
    navigator.clipboard.writeText(codeBox.textContent);
    copyCode.textContent = "Copied!";
    setTimeout(() => copyCode.textContent = "Copy", 900);
});

sizeSlider.addEventListener("input", () => {
    sizeValue.textContent = sizeSlider.value
    if (!isSorting) {
        generateArray()
        drawBars()
        clearSortedClasses()
    }
})
const expandBtn = document.getElementById("expandCode");
const codeContainer = document.getElementById("codeContainer");

expandBtn.addEventListener("click", () => {
    const expanded = codeContainer.classList.toggle("expanded");

    if (expanded) {
        codeContainer.classList.remove("collapsed");
        expandBtn.textContent = "Collapse ▲";
    } else {
        codeContainer.classList.add("collapsed");
        expandBtn.textContent = "Expand ▼";
    }
});


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
        updateAlgoLabel();
        updateInfoPanel();
        updateCodeBox();
    }
});

codeLang.addEventListener("change", updateCodeBox);


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
