(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/account/currentAccount.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "currentAccount",
    ()=>currentAccount
]);
const currentAccount = {
    creatorId: 8,
    displayName: '수박이',
    role: 'creator'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/apiClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "request",
    ()=>request
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
async function request(path, options) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        ...options
    });
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    if (response.status === 204) {
        return undefined;
    }
    return response.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/cartService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cartService",
    ()=>cartService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/account/currentAccount.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
;
;
const currentUserId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId;
const cartService = {
    getItems () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/print-cart?userId=${currentUserId}`);
    },
    addItem (guidebookId) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])('/print-cart', {
            method: 'POST',
            body: JSON.stringify({
                userId: currentUserId,
                guidebookId,
                quantity: 1
            })
        });
    },
    updateQuantity (guidebookId, quantity) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/print-cart/${guidebookId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                userId: currentUserId,
                quantity
            })
        });
    },
    removeItem (guidebookId) {
        return fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'}/print-cart/${guidebookId}?userId=${currentUserId}`, {
            method: 'DELETE'
        }).then((response)=>{
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/basket/printCartStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrintCartStore",
    ()=>usePrintCartStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cartService.ts [app-client] (ecmascript)");
;
;
function getGuidebookIds(items) {
    return items.map((item)=>item.guidebookId);
}
const usePrintCartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        error: '',
        guidebookIds: [],
        items: [],
        loading: false,
        async loadCart () {
            try {
                set({
                    error: '',
                    loading: true
                });
                const items = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartService"].getItems();
                set({
                    guidebookIds: getGuidebookIds(items),
                    items
                });
            } catch  {
                set({
                    error: '담아둔 가이드북 정보를 불러오지 못했습니다.',
                    guidebookIds: [],
                    items: []
                });
            } finally{
                set({
                    loading: false
                });
            }
        },
        async addGuidebook (guidebookId) {
            set({
                error: ''
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartService"].addItem(guidebookId);
            await get().loadCart();
        },
        async removeGuidebook (guidebookId) {
            set({
                error: ''
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartService"].removeItem(guidebookId);
            const items = get().items.filter((item)=>item.guidebookId !== guidebookId);
            set({
                guidebookIds: getGuidebookIds(items),
                items
            });
        },
        async updateQuantity (guidebookId, quantity) {
            const previousItems = get().items;
            const nextQuantity = Math.max(1, quantity);
            const optimisticItems = previousItems.map((item)=>item.guidebookId === guidebookId ? {
                    ...item,
                    quantity: nextQuantity
                } : item);
            set({
                error: '',
                items: optimisticItems
            });
            try {
                const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartService"].updateQuantity(guidebookId, nextQuantity);
                const items = get().items.map((item)=>item.guidebookId === guidebookId ? updated : item);
                set({
                    guidebookIds: getGuidebookIds(items),
                    items
                });
            } catch  {
                set({
                    error: '수량을 저장하지 못했습니다.',
                    items: previousItems
                });
            }
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/common/HeaderPrintButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeaderPrintButton",
    ()=>HeaderPrintButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/basket/printCartStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function PaperIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 3.5h7l3 3V20.5H7z"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 3.5v4h4"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9.5 12h5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9.5 15h5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = PaperIcon;
function DownloadIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 4v10"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m8 10 4 4 4-4"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 19h14"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c1 = DownloadIcon;
function PaperListIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 3.5h7l3 3V20.5H7z"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 3.5v4h4"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9.5 11h5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9.5 14h5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M9.5 17h3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c2 = PaperListIcon;
function HeaderPrintButton() {
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const basketCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"])({
        "HeaderPrintButton.usePrintCartStore[basketCount]": (state)=>state.guidebookIds.length
    }["HeaderPrintButton.usePrintCartStore[basketCount]"]);
    const loadCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"])({
        "HeaderPrintButton.usePrintCartStore[loadCart]": (state)=>state.loadCart
    }["HeaderPrintButton.usePrintCartStore[loadCart]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeaderPrintButton.useEffect": ()=>{
            void loadCart();
        }
    }["HeaderPrintButton.useEffect"], [
        loadCart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeaderPrintButton.useEffect": ()=>{
            function closeOnOutsideClick(event) {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setIsMenuOpen(false);
                }
            }
            function closeOnEscape(event) {
                if (event.key === 'Escape') {
                    setIsMenuOpen(false);
                }
            }
            document.addEventListener('mousedown', closeOnOutsideClick);
            document.addEventListener('keydown', closeOnEscape);
            return ({
                "HeaderPrintButton.useEffect": ()=>{
                    document.removeEventListener('mousedown', closeOnOutsideClick);
                    document.removeEventListener('keydown', closeOnEscape);
                }
            })["HeaderPrintButton.useEffect"];
        }
    }["HeaderPrintButton.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "header-print-menu",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "header-print-button",
                type: "button",
                "aria-label": `주문목록 열기, 담아둔 가이드북 ${basketCount}개`,
                "aria-expanded": isMenuOpen,
                onClick: ()=>setIsMenuOpen((previous)=>!previous),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaperIcon, {}, void 0, false, {
                        fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: basketCount
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "header-print-dropdown",
                role: "menu",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/print-cart?view=order",
                        role: "menuitem",
                        onClick: ()=>setIsMenuOpen(false),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DownloadIcon, {}, void 0, false, {
                                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "인쇄하기"
                            }, void 0, false, {
                                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/print-cart?view=sales",
                        role: "menuitem",
                        onClick: ()=>setIsMenuOpen(false),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaperListIcon, {}, void 0, false, {
                                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "판매목록"
                            }, void 0, false, {
                                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/HeaderPrintButton.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(HeaderPrintButton, "+JH358t8OW7jcYMz22BfSUjEhqY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"]
    ];
});
_c3 = HeaderPrintButton;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "PaperIcon");
__turbopack_context__.k.register(_c1, "DownloadIcon");
__turbopack_context__.k.register(_c2, "PaperListIcon");
__turbopack_context__.k.register(_c3, "HeaderPrintButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/common/AppHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppHeader",
    ()=>AppHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$HeaderPrintButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/HeaderPrintButton.tsx [app-client] (ecmascript)");
;
;
;
function AppHeader({ compact = false, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: compact ? 'topbar logo-topbar' : 'topbar',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "TripStack"
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/AppHeader.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/AppHeader.tsx",
                        lineNumber: 15,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/common/AppHeader.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "topbar-actions",
                children: [
                    !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "dark-button",
                        href: "/",
                        children: "홈"
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/AppHeader.tsx",
                        lineNumber: 18,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$HeaderPrintButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderPrintButton"], {}, void 0, false, {
                        fileName: "[project]/src/components/common/AppHeader.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/common/AppHeader.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/AppHeader.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = AppHeader;
var _c;
__turbopack_context__.k.register(_c, "AppHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/common/TopTabBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopTabBar",
    ()=>TopTabBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
function HomeIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 11.5 12 5l8 6.5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6.5 10.5V20h11v-9.5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 20v-5h4v5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/TopTabBar.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = HomeIcon;
function SearchIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10.5",
                cy: "10.5",
                r: "5.75"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m15 15 5 5"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/TopTabBar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c1 = SearchIcon;
function UserIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "8",
                r: "4"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 20c1.5-4 12.5-4 14 0"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/TopTabBar.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c2 = UserIcon;
function PeopleIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "9",
                cy: "8",
                r: "3.25"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.5 19c1-4.2 10-4.2 11 0"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16.5",
                cy: "9",
                r: "2.75"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13.5 18.5c1.3-2.9 6.2-2.9 7 0"
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/TopTabBar.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c3 = PeopleIcon;
function TopTabBar({ mode, isSearchOpen = false, isInterestOpen = false, interestCount = 0, searchContent, onHomeClick, onSearchToggle, onInterestToggle }) {
    const isHomeMode = mode === 'home';
    const isCreatorMode = mode === 'creator';
    const navClassName = [
        'consumer-feed-tabs',
        isCreatorMode ? 'creator-top-tabs' : '',
        mode === 'cart' ? 'cart-top-tabs' : '',
        isHomeMode && isSearchOpen ? 'search-open' : ''
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: navClassName,
        "aria-label": isHomeMode ? '컨슈머 주요 탭' : '주요 화면 이동',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: isHomeMode && !isSearchOpen ? 'consumer-feed-tab active' : 'consumer-feed-tab',
                href: "/",
                "aria-label": "홈",
                onClick: onHomeClick,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeIcon, {}, void 0, false, {
                    fileName: "[project]/src/components/common/TopTabBar.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: isCreatorMode ? 'consumer-feed-tab active' : 'consumer-feed-tab',
                href: "/creator",
                "aria-label": "마이페이지",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UserIcon, {}, void 0, false, {
                    fileName: "[project]/src/components/common/TopTabBar.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/common/TopTabBar.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            isHomeMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: isSearchOpen ? 'consumer-feed-tab active' : 'consumer-feed-tab',
                        type: "button",
                        "aria-label": "검색",
                        onClick: onSearchToggle,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                            fileName: "[project]/src/components/common/TopTabBar.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/TopTabBar.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "consumer-feed-search",
                        children: isSearchOpen && searchContent
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/TopTabBar.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : isCreatorMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: isInterestOpen ? 'consumer-feed-tab active' : 'consumer-feed-tab',
                    type: "button",
                    "aria-label": "관심 크리에이터",
                    onClick: onInterestToggle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PeopleIcon, {}, void 0, false, {
                            fileName: "[project]/src/components/common/TopTabBar.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this),
                        interestCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "tab-count-badge",
                            children: interestCount
                        }, void 0, false, {
                            fileName: "[project]/src/components/common/TopTabBar.tsx",
                            lineNumber: 110,
                            columnNumber: 33
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/common/TopTabBar.tsx",
                    lineNumber: 104,
                    columnNumber: 11
                }, this)
            }, void 0, false) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/TopTabBar.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_c4 = TopTabBar;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "HomeIcon");
__turbopack_context__.k.register(_c1, "SearchIcon");
__turbopack_context__.k.register(_c2, "UserIcon");
__turbopack_context__.k.register(_c3, "PeopleIcon");
__turbopack_context__.k.register(_c4, "TopTabBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/consumer/CreatorRail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreatorRail",
    ()=>CreatorRail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/account/currentAccount.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function formatCompactCount(count) {
    if (count >= 10000) {
        return `${Math.floor(count / 10000)}만`;
    }
    return count.toLocaleString();
}
function CreatorRail({ creators }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const railRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        isActive: false,
        isMoved: false,
        scrollLeft: 0,
        startX: 0
    });
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (creators.length === 0) {
        return null;
    }
    function handlePointerDown(event) {
        const rail = railRef.current;
        if (!rail) {
            return;
        }
        dragState.current = {
            isActive: true,
            isMoved: false,
            scrollLeft: rail.scrollLeft,
            startX: event.clientX
        };
    }
    function handlePointerMove(event) {
        const rail = railRef.current;
        if (!rail || !dragState.current.isActive) {
            return;
        }
        const distance = event.clientX - dragState.current.startX;
        if (Math.abs(distance) > 12) {
            dragState.current.isMoved = true;
            setIsDragging(true);
        }
        rail.scrollLeft = dragState.current.scrollLeft - distance;
    }
    function handlePointerEnd(event) {
        const rail = railRef.current;
        dragState.current.isActive = false;
        setIsDragging(false);
    }
    function openCreator(creator) {
        if (dragState.current.isMoved) {
            return;
        }
        const href = creator.id === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId ? '/creator' : `/creator/${creator.id}`;
        router.push(href);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "creator-rail-section",
        "aria-label": "인기 크리에이터",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: isDragging ? 'creator-rail dragging' : 'creator-rail',
            ref: railRef,
            onPointerCancel: handlePointerEnd,
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: handlePointerEnd,
            children: creators.map((creator)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "creator-bubble",
                    type: "button",
                    onClick: ()=>openCreator(creator),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: creator.avatarUrl,
                            alt: `${creator.username} profile`
                        }, void 0, false, {
                            fileName: "[project]/src/components/consumer/CreatorRail.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: creator.username
                        }, void 0, false, {
                            fileName: "[project]/src/components/consumer/CreatorRail.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: formatCompactCount(creator.followerCount)
                        }, void 0, false, {
                            fileName: "[project]/src/components/consumer/CreatorRail.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)
                    ]
                }, creator.id, true, {
                    fileName: "[project]/src/components/consumer/CreatorRail.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/consumer/CreatorRail.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/consumer/CreatorRail.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(CreatorRail, "Xsi2NUkVfXSpbAoWisSze7goEP0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CreatorRail;
var _c;
__turbopack_context__.k.register(_c, "CreatorRail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/guidebook/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "guidebookKeywordMap",
    ()=>guidebookKeywordMap,
    "layouts",
    ()=>layouts,
    "locationCategories",
    ()=>locationCategories,
    "regions",
    ()=>regions,
    "searchKeywords",
    ()=>searchKeywords
]);
const regions = [
    {
        id: 'all',
        label: '전체'
    },
    {
        id: '로마',
        label: '로마'
    },
    {
        id: '인터라켄',
        label: '인터라켄'
    },
    {
        id: '오키나와',
        label: '오키나와'
    },
    {
        id: '푸켓',
        label: '푸켓'
    },
    {
        id: '파리',
        label: '파리'
    },
    {
        id: '오사카',
        label: '오사카'
    },
    {
        id: '아마존',
        label: '아마존'
    }
];
const layouts = [
    {
        id: 'compact-a5',
        label: 'A5 컴팩트',
        description: '동선과 핵심 팁을 빠르게 훑는 소형 가이드'
    },
    {
        id: 'photo-b5',
        label: 'B5 포토북',
        description: '사진 비중을 높인 감성 여행 기록형'
    },
    {
        id: 'route-map',
        label: '동선 중심',
        description: '장소 순서와 이동 팁을 우선 배치'
    }
];
const locationCategories = [
    {
        id: 'korea',
        label: '대한민국',
        cities: [
            {
                id: '강원도',
                label: '강원도',
                description: '계곡, 숲길, 서울 근교 여름 코스'
            }
        ]
    },
    {
        id: 'italy',
        label: '이탈리아',
        cities: [
            {
                id: '로마',
                label: '로마',
                description: '광장, 골목, 클래식 여행지 중심 동선'
            }
        ]
    },
    {
        id: 'japan',
        label: '일본',
        cities: [
            {
                id: '오사카',
                label: '오사카',
                description: '저장해두고 보기 좋은 도심 여행'
            },
            {
                id: '오키나와',
                label: '오키나와',
                description: '해안 드라이브와 휴양 코스'
            }
        ]
    },
    {
        id: 'france',
        label: '프랑스',
        cities: [
            {
                id: '파리',
                label: '파리',
                description: '도시 산책과 클래식 명소 중심 가이드'
            }
        ]
    },
    {
        id: 'brazil',
        label: '브라질',
        cities: [
            {
                id: '아마존',
                label: '아마존',
                description: '자연과 사파리 분위기의 탐험 코스'
            }
        ]
    }
];
const searchKeywords = [
    {
        id: 'all',
        label: '전체'
    },
    {
        id: 'summer',
        label: '여름'
    },
    {
        id: 'winter',
        label: '겨울'
    },
    {
        id: 'weather',
        label: '날씨 좋은 날'
    },
    {
        id: 'city',
        label: '도시'
    },
    {
        id: 'resort',
        label: '휴양지'
    },
    {
        id: 'cafe',
        label: '카페'
    },
    {
        id: 'walk',
        label: '산책'
    }
];
const guidebookKeywordMap = {
    seoul: [
        'city',
        'cafe',
        'walk',
        'weather'
    ],
    gyeongju: [
        'city',
        'walk',
        'winter',
        'weather'
    ],
    jeju: [
        'summer',
        'resort',
        'cafe',
        'weather'
    ],
    roma: [
        'city',
        'walk',
        'winter',
        'weather'
    ],
    bangkok: [
        'summer',
        'city',
        'resort',
        'weather'
    ],
    아마존: [
        'summer',
        'resort',
        'weather'
    ],
    강원도: [
        'summer',
        'resort',
        'walk',
        'weather'
    ],
    안타나나리보: [
        'summer',
        'resort',
        'weather'
    ],
    오키나와: [
        'summer',
        'resort',
        'weather'
    ],
    인터라켄: [
        'winter',
        'resort',
        'walk',
        'weather'
    ],
    코펜하겐: [
        'winter',
        'city',
        'walk'
    ],
    로마: [
        'city',
        'walk',
        'winter',
        'weather'
    ],
    푸켓: [
        'summer',
        'resort',
        'weather'
    ],
    벤쿠버: [
        'summer',
        'resort',
        'walk',
        'weather'
    ],
    오사카: [
        'city',
        'cafe',
        'walk',
        'weather'
    ],
    제네바: [
        'winter',
        'city',
        'walk',
        'weather'
    ],
    파리: [
        'city',
        'cafe',
        'walk',
        'weather'
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/consumer/GuidebookCategorySections.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GuidebookCategorySections",
    ()=>GuidebookCategorySections
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/guidebook/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function formatCount(count) {
    if (count >= 10000) {
        return `${Math.floor(count / 10000)}만`;
    }
    return count.toLocaleString();
}
function ScrollableGuidebookRail({ children }) {
    _s();
    const railRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [scrollState, setScrollState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        canScrollLeft: false,
        canScrollRight: false
    });
    function updateScrollState() {
        const rail = railRef.current;
        if (!rail) {
            return;
        }
        const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
        setScrollState({
            canScrollLeft: rail.scrollLeft > 2,
            canScrollRight: rail.scrollLeft < maxScrollLeft - 2
        });
    }
    function scrollGuidebookRail(direction) {
        const rail = railRef.current;
        if (!rail) {
            return;
        }
        rail.scrollBy({
            left: rail.clientWidth * (direction === 'right' ? 0.86 : -0.86),
            behavior: 'smooth'
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollableGuidebookRail.useEffect": ()=>{
            updateScrollState();
            const rail = railRef.current;
            if (!rail) {
                return;
            }
            const resizeObserver = new ResizeObserver(updateScrollState);
            resizeObserver.observe(rail);
            return ({
                "ScrollableGuidebookRail.useEffect": ()=>{
                    resizeObserver.disconnect();
                }
            })["ScrollableGuidebookRail.useEffect"];
        }
    }["ScrollableGuidebookRail.useEffect"], [
        children
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "category-rail-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "category-guide-rail",
                ref: railRef,
                onScroll: updateScrollState,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            scrollState.canScrollLeft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "category-rail-button category-rail-prev",
                type: "button",
                "aria-label": "이전 가이드북 보기",
                onClick: ()=>scrollGuidebookRail('left'),
                children: "<"
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this),
            scrollState.canScrollRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "category-rail-button category-rail-next",
                type: "button",
                "aria-label": "다음 가이드북 보기",
                onClick: ()=>scrollGuidebookRail('right'),
                children: ">"
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(ScrollableGuidebookRail, "P/paG8B0+RnsgxC5jEMsp4/EkOI=");
_c = ScrollableGuidebookRail;
function GuidebookCategorySections({ creators, guidebooks, keywords, selectedGuidebook, onGuidebookSelect }) {
    const recommendedGuidebooks = [
        ...guidebooks
    ].sort((first, second)=>second.printCount - first.printCount);
    const visibleSections = keywords.filter((keyword)=>keyword.id !== 'all').map((keyword)=>({
            keyword,
            guidebooks: guidebooks.filter((guidebook)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookKeywordMap"][guidebook.region]?.includes(keyword.id))
        })).filter((section)=>section.guidebooks.length > 0);
    if (guidebooks.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "empty-state",
            children: "조건에 맞는 가이드북이 없습니다."
        }, void 0, false, {
            fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
            lineNumber: 120,
            columnNumber: 12
        }, this);
    }
    function renderGuidebookCard(guidebook, key) {
        const creator = creators.find((item)=>item.id === guidebook.creatorId);
        const locationLabel = guidebook.country === guidebook.region ? guidebook.region : `${guidebook.region} · ${guidebook.country}`;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: selectedGuidebook?.id === guidebook.id ? 'category-guide-card active' : 'category-guide-card',
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "category-guide-select",
                type: "button",
                onClick: ()=>onGuidebookSelect(guidebook),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "category-guide-media",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: guidebook.coverImageUrl,
                                alt: `${guidebook.title} thumbnail`
                            }, void 0, false, {
                                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "category-guide-title-layer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: guidebook.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: locationLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        children: formatCount(guidebook.printCount)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "category-guide-info",
                        children: [
                            creator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                className: "category-guide-avatar",
                                src: creator.avatarUrl,
                                alt: `${creator.username} profile`
                            }, void 0, false, {
                                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                lineNumber: 141,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "category-guide-copy",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "category-guide-main",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: guidebook.creatorName
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "category-guide-numbers",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: formatCount(guidebook.followerCount)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, this)
        }, key, false, {
            fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "category-sections",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "category-guide-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-heading category-section-heading",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "오늘의 추천 리스트"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "지금 가장 많이 저장된 가이드북을 먼저 둘러보세요."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollableGuidebookRail, {
                        children: recommendedGuidebooks.map((guidebook)=>renderGuidebookCard(guidebook, `recommended-${guidebook.id}`))
                    }, void 0, false, {
                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            visibleSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "category-guide-section",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-heading category-section-heading",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: [
                                            section.keyword.label,
                                            " 여행 가이드"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "선택한 조건에 맞는 인기 가이드북을 둘러보세요."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollableGuidebookRail, {
                            children: section.guidebooks.map((guidebook)=>renderGuidebookCard(guidebook, `${section.keyword.id}-${guidebook.id}`))
                        }, void 0, false, {
                            fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this)
                    ]
                }, section.keyword.id, true, {
                    fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/consumer/GuidebookCategorySections.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_c1 = GuidebookCategorySections;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollableGuidebookRail");
__turbopack_context__.k.register(_c1, "GuidebookCategorySections");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/consumer/GuidebookSearchBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GuidebookSearchBar",
    ()=>GuidebookSearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function SearchIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10.5",
                cy: "10.5",
                r: "5.75"
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m15 15 5 5"
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = SearchIcon;
function GuidebookSearchBar({ guidebooks, searchQuery, onSearchSubmit }) {
    _s();
    const searchShellRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [draftQuery, setDraftQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(searchQuery);
    const [activePanel, setActivePanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GuidebookSearchBar.useEffect": ()=>{
            setDraftQuery(searchQuery);
        }
    }["GuidebookSearchBar.useEffect"], [
        searchQuery
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GuidebookSearchBar.useEffect": ()=>{
            function closeOnOutsideClick(event) {
                if (!searchShellRef.current?.contains(event.target)) {
                    setActivePanel(null);
                }
            }
            document.addEventListener('mousedown', closeOnOutsideClick);
            return ({
                "GuidebookSearchBar.useEffect": ()=>document.removeEventListener('mousedown', closeOnOutsideClick)
            })["GuidebookSearchBar.useEffect"];
        }
    }["GuidebookSearchBar.useEffect"], []);
    const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GuidebookSearchBar.useMemo[suggestions]": ()=>{
            const keyword = draftQuery.trim().toLowerCase();
            const candidates = guidebooks.flatMap({
                "GuidebookSearchBar.useMemo[suggestions].candidates": (guidebook)=>{
                    const city = guidebook.region;
                    const country = guidebook.country;
                    return [
                        {
                            id: `city-${guidebook.region}`,
                            label: city,
                            description: `${country} · ${guidebook.title}`
                        },
                        {
                            id: `country-${guidebook.region}`,
                            label: country,
                            description: `${city} 포함 여행 가이드북`
                        },
                        {
                            id: `guidebook-${guidebook.id}`,
                            label: guidebook.title,
                            description: `${guidebook.creatorName} · ${city} · ${guidebook.printCount.toLocaleString()}회 인쇄`
                        }
                    ].filter({
                        "GuidebookSearchBar.useMemo[suggestions].candidates": (item)=>item.label
                    }["GuidebookSearchBar.useMemo[suggestions].candidates"]);
                }
            }["GuidebookSearchBar.useMemo[suggestions].candidates"]);
            const uniqueCandidates = Array.from(new Map(candidates.map({
                "GuidebookSearchBar.useMemo[suggestions].uniqueCandidates": (item)=>[
                        item.label,
                        item
                    ]
            }["GuidebookSearchBar.useMemo[suggestions].uniqueCandidates"])).values());
            if (!keyword) {
                return uniqueCandidates.slice(0, 5);
            }
            return uniqueCandidates.filter({
                "GuidebookSearchBar.useMemo[suggestions]": (item)=>`${item.label} ${item.description}`.toLowerCase().includes(keyword)
            }["GuidebookSearchBar.useMemo[suggestions]"]).slice(0, 6);
        }
    }["GuidebookSearchBar.useMemo[suggestions]"], [
        draftQuery,
        guidebooks
    ]);
    function submitSearch() {
        const normalizedQuery = draftQuery.trim();
        if (!normalizedQuery) {
            setDraftQuery('');
            onSearchSubmit('', 'all');
            setActivePanel(null);
            return;
        }
        onSearchSubmit(normalizedQuery, 'all');
        setActivePanel(null);
    }
    function clearQuery() {
        setDraftQuery('');
        onSearchSubmit('', 'all');
        setActivePanel(null);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "search-hero compact-search-hero",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "search-copy centered-copy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "여행지를 검색해주세요."
                }, void 0, false, {
                    fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "trip-search-shell",
                ref: searchShellRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "trip-search-bar keyword-search-bar",
                        role: "search",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: `trip-search-segment text-segment ${activePanel === 'text' ? 'active' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: draftQuery,
                                        onChange: (event)=>{
                                            const nextQuery = event.target.value;
                                            setDraftQuery(nextQuery);
                                            setActivePanel('text');
                                            if (nextQuery.trim().length === 0) {
                                                onSearchSubmit('', 'all');
                                            }
                                        },
                                        onFocus: ()=>setActivePanel('text'),
                                        placeholder: "도시, 국가 검색"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    draftQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "search-clear-button",
                                        type: "button",
                                        "aria-label": "검색어 지우기",
                                        onClick: clearQuery,
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "trip-search-button",
                                type: "button",
                                onClick: submitSearch,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchIcon, {}, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this),
                                    "검색"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    activePanel === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "search-popover text-popover keyword-suggestion-popover",
                        children: suggestions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "empty-state",
                            children: "검색어와 맞는 여행지가 없습니다."
                        }, void 0, false, {
                            fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                            lineNumber: 141,
                            columnNumber: 15
                        }, this) : suggestions.map((suggestion)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "suggestion-row",
                                type: "button",
                                onClick: ()=>{
                                    setDraftQuery(suggestion.label);
                                    setActivePanel(null);
                                    onSearchSubmit(suggestion.label, 'all');
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "⌖"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                        lineNumber: 153,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: suggestion.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                                lineNumber: 155,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: suggestion.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                                lineNumber: 156,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                        lineNumber: 154,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, suggestion.id, true, {
                                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                                lineNumber: 144,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/consumer/GuidebookSearchBar.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(GuidebookSearchBar, "RCu4YTXPty6uKCA+zDBKRNQ2aUE=");
_c1 = GuidebookSearchBar;
var _c, _c1;
__turbopack_context__.k.register(_c, "SearchIcon");
__turbopack_context__.k.register(_c1, "GuidebookSearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GuidebookPrintDetailModal",
    ()=>GuidebookPrintDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/basket/printCartStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function formatCompactCount(count) {
    if (count >= 10000) {
        return `${Math.floor(count / 10000)}만`;
    }
    return count.toLocaleString();
}
function GuidebookPrintDetailModal({ blocks, canManage = false, creator, guidebook, onClose, onDelete, onEdit, showBasketAction = false }) {
    _s();
    const [isManageMenuOpen, setIsManageMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBasketUpdating, setIsBasketUpdating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const addGuidebook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"])({
        "GuidebookPrintDetailModal.usePrintCartStore[addGuidebook]": (state)=>state.addGuidebook
    }["GuidebookPrintDetailModal.usePrintCartStore[addGuidebook]"]);
    const guidebookIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"])({
        "GuidebookPrintDetailModal.usePrintCartStore[guidebookIds]": (state)=>state.guidebookIds
    }["GuidebookPrintDetailModal.usePrintCartStore[guidebookIds]"]);
    const loadCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"])({
        "GuidebookPrintDetailModal.usePrintCartStore[loadCart]": (state)=>state.loadCart
    }["GuidebookPrintDetailModal.usePrintCartStore[loadCart]"]);
    const removeGuidebook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"])({
        "GuidebookPrintDetailModal.usePrintCartStore[removeGuidebook]": (state)=>state.removeGuidebook
    }["GuidebookPrintDetailModal.usePrintCartStore[removeGuidebook]"]);
    const isBasketed = guidebookIds.includes(guidebook.id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GuidebookPrintDetailModal.useEffect": ()=>{
            if (showBasketAction) {
                void loadCart();
            }
        }
    }["GuidebookPrintDetailModal.useEffect"], [
        loadCart,
        showBasketAction
    ]);
    async function toggleBasket() {
        try {
            setIsBasketUpdating(true);
            if (isBasketed) {
                await removeGuidebook(guidebook.id);
            } else {
                await addGuidebook(guidebook.id);
            }
        } finally{
            setIsBasketUpdating(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "print-detail-layer",
        role: "presentation",
        onMouseDown: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "print-detail-view",
            "aria-label": `${guidebook.title} 인쇄물 상세정보`,
            onMouseDown: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "print-detail-toolbar",
                    children: [
                        showBasketAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: isBasketed ? 'print-detail-basket basketed' : 'print-detail-basket',
                            type: "button",
                            disabled: isBasketUpdating,
                            onClick: ()=>void toggleBasket(),
                            children: isBasketed ? '인쇄목록에서 빼기' : '인쇄목록에 담기'
                        }, void 0, false, {
                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        canManage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "print-detail-manage",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "print-detail-more",
                                    type: "button",
                                    "aria-label": "게시물 관리 메뉴",
                                    "aria-expanded": isManageMenuOpen,
                                    onClick: ()=>setIsManageMenuOpen((previous)=>!previous)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                isManageMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "print-detail-manage-menu",
                                    role: "menu",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            role: "menuitem",
                                            onClick: onDelete,
                                            disabled: !onDelete,
                                            children: "게시물 삭제"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                            lineNumber: 91,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            role: "menuitem",
                                            onClick: onEdit,
                                            disabled: !onEdit,
                                            children: "수정"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                            lineNumber: 92,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 90,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "print-detail-close",
                            type: "button",
                            "aria-label": "인쇄물 상세 닫기",
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "print-detail-summary",
                    children: [
                        creator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: creator.avatarUrl,
                            alt: `${creator.username} profile`
                        }, void 0, false, {
                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                            lineNumber: 103,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Print detail"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: guidebook.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        guidebook.region,
                                        " · ",
                                        guidebook.country,
                                        " · ",
                                        formatCompactCount(guidebook.printCount),
                                        " 조회수"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        formatCompactCount(guidebook.followerCount),
                                        " 총 인쇄판매수"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this),
                guidebook.mapImageUrl && guidebook.routePoints.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "print-detail-route",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Route map"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: [
                                        guidebook.region,
                                        " 이동 동선"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "print-detail-route-map",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: guidebook.mapImageUrl,
                                    alt: `${guidebook.region} 이동 동선 지도`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "print-detail-route-line",
                                    viewBox: "0 0 100 100",
                                    preserveAspectRatio: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: guidebook.routePoints.map((point)=>`${point.x},${point.y}`).join(' '),
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "1.8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this),
                                guidebook.routePoints.map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "print-detail-route-point",
                                        style: {
                                            left: `${point.x}%`,
                                            top: `${point.y}%`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: point.pointOrder
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this),
                                            point.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: point.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                                lineNumber: 133,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, point.id, true, {
                                        fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "print-detail-blocks",
                    children: blocks.map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "print-detail-block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: block.imageUrl,
                                    alt: block.placeName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: block.placeName
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Page ",
                                                block.stepOrder,
                                                " · ",
                                                guidebook.region
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: block.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, block.id, true, {
                            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(GuidebookPrintDetailModal, "SyYEE4MAjUbBBuDdcVBsxQ/YuQU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"]
    ];
});
_c = GuidebookPrintDetailModal;
var _c;
__turbopack_context__.k.register(_c, "GuidebookPrintDetailModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/interest/creatorInterest.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTERESTED_CREATOR_EVENT_NAME",
    ()=>INTERESTED_CREATOR_EVENT_NAME,
    "addInterestedCreatorId",
    ()=>addInterestedCreatorId,
    "readInterestedCreatorIds",
    ()=>readInterestedCreatorIds,
    "removeInterestedCreatorId",
    ()=>removeInterestedCreatorId,
    "toggleInterestedCreatorId",
    ()=>toggleInterestedCreatorId,
    "writeInterestedCreatorIds",
    ()=>writeInterestedCreatorIds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/account/currentAccount.ts [app-client] (ecmascript)");
;
const INTERESTED_CREATOR_EVENT_NAME = 'tripstack:interested-creators-changed';
const INTERESTED_CREATOR_STORAGE_KEY = `tripstack.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].role}.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId}.interestedCreatorIds`;
function normalizeCreatorIds(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.filter((item)=>Number.isInteger(item));
}
function readInterestedCreatorIds() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeCreatorIds(JSON.parse(window.localStorage.getItem(INTERESTED_CREATOR_STORAGE_KEY) ?? '[]'));
    } catch  {
        return [];
    }
}
function writeInterestedCreatorIds(creatorIds) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const uniqueCreatorIds = [
        ...new Set(creatorIds)
    ];
    window.localStorage.setItem(INTERESTED_CREATOR_STORAGE_KEY, JSON.stringify(uniqueCreatorIds));
    window.dispatchEvent(new CustomEvent(INTERESTED_CREATOR_EVENT_NAME, {
        detail: uniqueCreatorIds
    }));
    return uniqueCreatorIds;
}
function addInterestedCreatorId(creatorId) {
    return writeInterestedCreatorIds([
        ...readInterestedCreatorIds(),
        creatorId
    ]);
}
function removeInterestedCreatorId(creatorId) {
    return writeInterestedCreatorIds(readInterestedCreatorIds().filter((id)=>id !== creatorId));
}
function toggleInterestedCreatorId(creatorId) {
    const creatorIds = readInterestedCreatorIds();
    if (creatorIds.includes(creatorId)) {
        return writeInterestedCreatorIds(creatorIds.filter((id)=>id !== creatorId));
    }
    return writeInterestedCreatorIds([
        ...creatorIds,
        creatorId
    ]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/consumer/ConsumerGuidebookFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConsumerGuidebookFeed",
    ()=>ConsumerGuidebookFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$TopTabBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/TopTabBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$consumer$2f$CreatorRail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/consumer/CreatorRail.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$consumer$2f$GuidebookCategorySections$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/consumer/GuidebookCategorySections.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$consumer$2f$GuidebookSearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/consumer/GuidebookSearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$guidebook$2f$GuidebookPrintDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/account/currentAccount.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/interest/creatorInterest.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function formatCompactCount(count) {
    if (count >= 10000) {
        return `${Math.floor(count / 10000)}만`;
    }
    return count.toLocaleString();
}
function HeartIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M20.5 8.9c0 5.3-8.5 10-8.5 10s-8.5-4.7-8.5-10A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.5 2.9Z"
        }, void 0, false, {
            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = HeartIcon;
function ConsumerGuidebookFeed(props) {
    _s();
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDetailOpen, setIsDetailOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPrintDetailOpen, setIsPrintDetailOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [interestedCreatorIds, setInterestedCreatorIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const selectedCreator = props.creators.find((creator)=>creator.id === props.selectedGuidebook?.creatorId);
    const isSelectedCreatorInterested = selectedCreator ? interestedCreatorIds.includes(selectedCreator.id) : false;
    const isSelectedCreatorCurrentAccount = selectedCreator?.id === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConsumerGuidebookFeed.useEffect": ()=>{
            function closeOnEscape(event) {
                if (event.key === 'Escape') {
                    if (isPrintDetailOpen) {
                        setIsPrintDetailOpen(false);
                        return;
                    }
                    setIsDetailOpen(false);
                }
            }
            document.addEventListener('keydown', closeOnEscape);
            return ({
                "ConsumerGuidebookFeed.useEffect": ()=>document.removeEventListener('keydown', closeOnEscape)
            })["ConsumerGuidebookFeed.useEffect"];
        }
    }["ConsumerGuidebookFeed.useEffect"], [
        isPrintDetailOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConsumerGuidebookFeed.useEffect": ()=>{
            setInterestedCreatorIds((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readInterestedCreatorIds"])());
            function syncInterestedCreators(event) {
                setInterestedCreatorIds(event.detail ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readInterestedCreatorIds"])());
            }
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTERESTED_CREATOR_EVENT_NAME"], syncInterestedCreators);
            return ({
                "ConsumerGuidebookFeed.useEffect": ()=>window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTERESTED_CREATOR_EVENT_NAME"], syncInterestedCreators)
            })["ConsumerGuidebookFeed.useEffect"];
        }
    }["ConsumerGuidebookFeed.useEffect"], []);
    function openGuidebookDetail(guidebook) {
        props.onGuidebookSelect(guidebook);
        setIsDetailOpen(true);
        setIsPrintDetailOpen(false);
    }
    function toggleSelectedCreatorInterest() {
        if (!selectedCreator) {
            return;
        }
        if (selectedCreator.id === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId) {
            return;
        }
        setInterestedCreatorIds((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleInterestedCreatorId"])(selectedCreator.id));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$TopTabBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopTabBar"], {
                mode: "home",
                isSearchOpen: isSearchOpen,
                onHomeClick: ()=>setIsSearchOpen(false),
                onSearchToggle: ()=>setIsSearchOpen((previous)=>!previous),
                searchContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$consumer$2f$GuidebookSearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GuidebookSearchBar"], {
                    guidebooks: props.guidebooks,
                    searchQuery: props.searchQuery,
                    onSearchSubmit: props.onSearchSubmit
                }, void 0, false, {
                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "consumer-feed-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$consumer$2f$CreatorRail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreatorRail"], {
                        creators: props.creators
                    }, void 0, false, {
                        fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$consumer$2f$GuidebookCategorySections$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GuidebookCategorySections"], {
                        creators: props.creators,
                        guidebooks: props.guidebooks,
                        keywords: props.searchKeywords,
                        selectedGuidebook: props.selectedGuidebook,
                        onGuidebookSelect: openGuidebookDetail
                    }, void 0, false, {
                        fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            isDetailOpen && props.selectedGuidebook && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "guidebook-detail-layer",
                role: "presentation",
                onMouseDown: ()=>setIsDetailOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "guidebook-detail-panel",
                    "aria-label": `${props.selectedGuidebook.title} 상세 가이드북`,
                    onMouseDown: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "guidebook-detail-close",
                            type: "button",
                            "aria-label": "상세 닫기",
                            onClick: ()=>setIsDetailOpen(false),
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "guidebook-detail-hero",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    className: "guidebook-detail-cover",
                                    src: props.selectedGuidebook.coverImageUrl,
                                    alt: `${props.selectedGuidebook.title} cover`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "guidebook-detail-hero-copy",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: props.selectedGuidebook.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: props.selectedGuidebook.region
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                formatCompactCount(props.selectedGuidebook.printCount),
                                                " 조회수"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "guidebook-detail-heading",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "guidebook-detail-creator",
                                    children: [
                                        selectedCreator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: selectedCreator.avatarUrl,
                                            alt: `${selectedCreator.username} profile`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                            lineNumber: 152,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "guidebook-detail-creator-name",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: props.selectedGuidebook.creatorName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                            lineNumber: 155,
                                                            columnNumber: 21
                                                        }, this),
                                                        !isSelectedCreatorCurrentAccount && selectedCreator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: isSelectedCreatorInterested ? 'creator-heart-toggle active' : 'creator-heart-toggle',
                                                            type: "button",
                                                            "aria-label": isSelectedCreatorInterested ? '관심 크리에이터 해제' : '관심 크리에이터 추가',
                                                            "aria-pressed": isSelectedCreatorInterested,
                                                            onClick: toggleSelectedCreatorInterest,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeartIcon, {}, void 0, false, {
                                                                fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                                lineNumber: 163,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: props.selectedGuidebook.followerCount.toLocaleString()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                            lineNumber: 153,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "guidebook-detail-actions",
                                    children: [
                                        isSelectedCreatorCurrentAccount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/creator",
                                            children: "내 화면"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                            lineNumber: 172,
                                            columnNumber: 19
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsPrintDetailOpen(true),
                                            children: "상세화면"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "guidebook-detail-scroll",
                            children: props.blocks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "empty-state",
                                children: "가이드 내용을 불러오는 중입니다."
                            }, void 0, false, {
                                fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                lineNumber: 182,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "guidebook-detail-preview-row",
                                    "aria-label": "가이드북 주요 장면",
                                    children: props.blocks.slice(0, 3).map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "guidebook-detail-preview-item",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: block.imageUrl,
                                                    alt: block.placeName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            children: block.placeName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: block.content
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, block.id, true, {
                                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                            lineNumber: 187,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                                    lineNumber: 185,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this),
            isPrintDetailOpen && props.selectedGuidebook && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$guidebook$2f$GuidebookPrintDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GuidebookPrintDetailModal"], {
                blocks: props.blocks,
                creator: selectedCreator,
                guidebook: props.selectedGuidebook,
                onClose: ()=>setIsPrintDetailOpen(false),
                showBasketAction: props.selectedGuidebook.creatorId !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId
            }, void 0, false, {
                fileName: "[project]/src/components/consumer/ConsumerGuidebookFeed.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ConsumerGuidebookFeed, "HS3nUlXjRgkvcntS7z8SPsVHVrA=");
_c1 = ConsumerGuidebookFeed;
var _c, _c1;
__turbopack_context__.k.register(_c, "HeartIcon");
__turbopack_context__.k.register(_c1, "ConsumerGuidebookFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/guidebookService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "guidebookService",
    ()=>guidebookService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
;
const guidebookService = {
    getCreators () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])('/users?role=creator');
    },
    getGuidebooks (region) {
        const query = region && region !== 'all' ? `?region=${encodeURIComponent(region)}` : '';
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/guidebooks${query}`);
    },
    getGuidebookBlocks (guidebookId) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/guidebooks/${guidebookId}/blocks`);
    },
    createGuidebook (payload) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])('/guidebooks', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },
    updateGuidebook (guidebookId, payload) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/guidebooks/${guidebookId}`, {
            method: 'PATCH',
            body: JSON.stringify(payload)
        });
    },
    deleteGuidebook (guidebookId) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/guidebooks/${guidebookId}`, {
            method: 'DELETE'
        });
    },
    getOrders () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])('/orders');
    },
    createOrder (payload) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])('/orders', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },
    updateOrderStatus (orderId, status) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/orders/${orderId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({
                status
            })
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/guidebook/hooks/useGuidebookCatalog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGuidebookCatalog",
    ()=>useGuidebookCatalog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/guidebook/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/guidebookService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function uniqueBy(items, getKey) {
    const seenKeys = new Set();
    return items.filter((item)=>{
        const key = getKey(item);
        if (seenKeys.has(key)) {
            return false;
        }
        seenKeys.add(key);
        return true;
    });
}
function useGuidebookCatalog() {
    _s();
    const [creators, setCreators] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [guidebooks, setGuidebooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedKeyword, setSelectedKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedGuidebook, setSelectedGuidebook] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedLayout, setSelectedLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["layouts"][0].id);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGuidebookCatalog.useEffect": ()=>{
            async function loadInitialData() {
                try {
                    setLoading(true);
                    setError('');
                    const [creatorData, orderData] = await Promise.all([
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].getCreators(),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].getOrders()
                    ]);
                    setCreators(uniqueBy(creatorData, {
                        "useGuidebookCatalog.useEffect.loadInitialData": (creator)=>`${creator.username}-${creator.avatarUrl}`
                    }["useGuidebookCatalog.useEffect.loadInitialData"]));
                    setOrders(orderData);
                } catch  {
                    setError('초기 데이터를 불러오지 못했습니다. API 서버 상태를 확인해 주세요.');
                } finally{
                    setLoading(false);
                }
            }
            void loadInitialData();
        }
    }["useGuidebookCatalog.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGuidebookCatalog.useEffect": ()=>{
            async function loadGuidebooks() {
                try {
                    setError('');
                    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].getGuidebooks();
                    const uniqueGuidebooks = uniqueBy(data, {
                        "useGuidebookCatalog.useEffect.loadGuidebooks.uniqueGuidebooks": (guidebook)=>[
                                guidebook.creatorId,
                                guidebook.title,
                                guidebook.country,
                                guidebook.region,
                                guidebook.coverImageUrl
                            ].join('|')
                    }["useGuidebookCatalog.useEffect.loadGuidebooks.uniqueGuidebooks"]);
                    setGuidebooks(uniqueGuidebooks);
                    setSelectedGuidebook({
                        "useGuidebookCatalog.useEffect.loadGuidebooks": (previous)=>{
                            if (previous && uniqueGuidebooks.some({
                                "useGuidebookCatalog.useEffect.loadGuidebooks": (item)=>item.id === previous.id
                            }["useGuidebookCatalog.useEffect.loadGuidebooks"])) {
                                return previous;
                            }
                            return uniqueGuidebooks[0] ?? null;
                        }
                    }["useGuidebookCatalog.useEffect.loadGuidebooks"]);
                } catch  {
                    setError('가이드북 목록을 불러오지 못했습니다.');
                }
            }
            void loadGuidebooks();
        }
    }["useGuidebookCatalog.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGuidebookCatalog.useEffect": ()=>{
            if (!selectedGuidebook) {
                setBlocks([]);
                return;
            }
            const guidebookId = selectedGuidebook.id;
            async function loadBlocks() {
                try {
                    setBlocks(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].getGuidebookBlocks(guidebookId));
                } catch  {
                    setError('가이드북 상세 블록을 불러오지 못했습니다.');
                }
            }
            void loadBlocks();
        }
    }["useGuidebookCatalog.useEffect"], [
        selectedGuidebook
    ]);
    const filteredGuidebooks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useGuidebookCatalog.useMemo[filteredGuidebooks]": ()=>{
            const keyword = searchQuery.trim().toLowerCase();
            return guidebooks.filter({
                "useGuidebookCatalog.useMemo[filteredGuidebooks]": (guidebook)=>{
                    const searchableText = [
                        guidebook.title,
                        guidebook.country,
                        guidebook.region,
                        guidebook.creatorName
                    ].join(' ').toLowerCase();
                    const matchesText = !keyword || searchableText.includes(keyword);
                    const matchesKeyword = selectedKeyword === 'all' || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookKeywordMap"][guidebook.region]?.includes(selectedKeyword);
                    return matchesText && matchesKeyword;
                }
            }["useGuidebookCatalog.useMemo[filteredGuidebooks]"]);
        }
    }["useGuidebookCatalog.useMemo[filteredGuidebooks]"], [
        guidebooks,
        searchQuery,
        selectedKeyword
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGuidebookCatalog.useEffect": ()=>{
            setSelectedGuidebook({
                "useGuidebookCatalog.useEffect": (previous)=>{
                    if (previous && filteredGuidebooks.some({
                        "useGuidebookCatalog.useEffect": (item)=>item.id === previous.id
                    }["useGuidebookCatalog.useEffect"])) {
                        return previous;
                    }
                    return filteredGuidebooks[0] ?? null;
                }
            }["useGuidebookCatalog.useEffect"]);
        }
    }["useGuidebookCatalog.useEffect"], [
        filteredGuidebooks
    ]);
    const topGuidebook = filteredGuidebooks[0];
    const totalPrintCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useGuidebookCatalog.useMemo[totalPrintCount]": ()=>guidebooks.reduce({
                "useGuidebookCatalog.useMemo[totalPrintCount]": (sum, guidebook)=>sum + guidebook.printCount
            }["useGuidebookCatalog.useMemo[totalPrintCount]"], 0)
    }["useGuidebookCatalog.useMemo[totalPrintCount]"], [
        guidebooks
    ]);
    function submitSearch(query, keyword) {
        setSearchQuery(query);
        setSelectedKeyword(keyword);
    }
    async function updateOrderStatus(order, status) {
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].updateOrderStatus(order.id, status);
        setOrders((previous)=>previous.map((item)=>item.id === updated.id ? updated : item));
    }
    return {
        blocks,
        creators,
        error,
        guidebooks: filteredGuidebooks,
        loading,
        orders,
        searchQuery,
        selectedGuidebook,
        selectedLayout,
        selectedKeyword,
        setSearchQuery,
        setSelectedGuidebook,
        submitSearch,
        setSelectedKeyword,
        setSelectedLayout,
        topGuidebook,
        totalPrintCount,
        updateOrderStatus
    };
}
_s(useGuidebookCatalog, "gTjg2d0wGiRbGvpJRt0sveIdA/0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/AppHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$consumer$2f$ConsumerGuidebookFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/consumer/ConsumerGuidebookFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/guidebook/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$hooks$2f$useGuidebookCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/guidebook/hooks/useGuidebookCatalog.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function HomePage() {
    _s();
    const catalog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$hooks$2f$useGuidebookCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGuidebookCatalog"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppHeader"], {
                compact: true,
                title: "여행자 가이드북 마켓"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            catalog.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-message",
                children: catalog.error
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 14,
                columnNumber: 25
            }, this),
            catalog.loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "empty-state",
                children: "가이드북 데이터를 불러오는 중입니다."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$consumer$2f$ConsumerGuidebookFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsumerGuidebookFeed"], {
                blocks: catalog.blocks,
                creators: catalog.creators,
                guidebooks: catalog.guidebooks,
                searchQuery: catalog.searchQuery,
                searchKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchKeywords"],
                selectedGuidebook: catalog.selectedGuidebook,
                selectedKeyword: catalog.selectedKeyword,
                onGuidebookSelect: catalog.setSelectedGuidebook,
                onSearchSubmit: catalog.submitSearch
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(HomePage, "5y3xhT2uT0m0f6SKuu7Uthn5Y/Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$hooks$2f$useGuidebookCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGuidebookCatalog"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0989-ce._.js.map