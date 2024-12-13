import { useEffect, useState } from "react"

export default function useFromStore<T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	storeCallback: (state: T) => F
) {
// 把傳進來的Globalstore 的hook function, 
// 傳入第二個參數是要取的State, 即可由該Store取得相對應的state
// 範例: const cart = useFromStore(useCartStore, state => state.cart)
// as F 是typescript的語法, 宣告stateOfStore 的型別
	const stateOfStore = store(storeCallback) as F
// 取得persist state 後, 再使用useEffect去Trigger 設定state後回傳
// 以保持遠端資料內容和local storage中資料一致, 並用於render畫面
	const [state, setState] = useState<F>()

	useEffect(() => {
		setState(stateOfStore)
	}, [stateOfStore])

	return state
}
