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
"[project]/src/components/creator/CreateGuidebookModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateGuidebookModal",
    ()=>CreateGuidebookModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const locationOptions = [
    {
        country: '이탈리아',
        city: '로마',
        mapImageUrl: '/images/map/로마-map.jpeg'
    },
    {
        country: '프랑스',
        city: '파리',
        mapImageUrl: '/images/map/파리-map.jpeg'
    },
    {
        country: '일본',
        city: '오사카',
        mapImageUrl: '/images/map/오사카-map.jpeg'
    },
    {
        country: '브라질',
        city: '아마존',
        mapImageUrl: '/images/map/아마존-map.jpeg'
    }
];
const initialRoutePoints = [
    {
        id: 1,
        pointOrder: 1,
        title: '',
        x: 22,
        y: 32
    },
    {
        id: 2,
        pointOrder: 2,
        title: '',
        x: 42,
        y: 24
    },
    {
        id: 3,
        pointOrder: 3,
        title: '',
        x: 58,
        y: 46
    },
    {
        id: 4,
        pointOrder: 4,
        title: '',
        x: 35,
        y: 66
    },
    {
        id: 5,
        pointOrder: 5,
        title: '',
        x: 72,
        y: 62
    }
];
function createEmptyDetailBlock() {
    return {
        id: Date.now() + Math.floor(Math.random() * 1000),
        imageName: '',
        imageUrl: '',
        title: '',
        subtitle: '',
        content: ''
    };
}
function clampPercent(value) {
    return Math.min(100, Math.max(0, value));
}
function CreateGuidebookModal({ initialDraft, mode = 'create', onClose, onCreate }) {
    _s();
    const [videoUrl, setVideoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const initialLocation = initialDraft ? {
        country: initialDraft.country,
        city: initialDraft.region,
        mapImageUrl: initialDraft.mapImageUrl
    } : locationOptions[1];
    const availableLocationOptions = locationOptions.some((option)=>option.country === initialLocation.country && option.city === initialLocation.city) ? locationOptions : [
        initialLocation,
        ...locationOptions
    ];
    const [selectedLocation, setSelectedLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialLocation);
    const [activePointId, setActivePointId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detailBlocks, setDetailBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialDraft?.blocks.length ? initialDraft.blocks : [
        createEmptyDetailBlock()
    ]);
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [validationMessage, setValidationMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [routePoints, setRoutePoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialDraft?.routePoints.length ? initialDraft.routePoints : initialRoutePoints);
    function readVideo() {
        setDetailBlocks((previous)=>previous.map((block, index)=>index === 0 ? {
                    ...block,
                    content: '영상에서 분석된 장소 설명이 이 영역에 임시로 들어갑니다. 이동 순서, 장소 분위기, 다시 확인해야 할 포인트를 바탕으로 인쇄용 가이드 문장을 구성합니다.'
                } : block));
    }
    function moveActivePoint(event) {
        if (activePointId === null) {
            return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const x = clampPercent((event.clientX - rect.left) / rect.width * 100);
        const y = clampPercent((event.clientY - rect.top) / rect.height * 100);
        setRoutePoints((previous)=>previous.map((point)=>point.id === activePointId ? {
                    ...point,
                    x,
                    y
                } : point));
    }
    function updateDetailBlock(blockId, updates) {
        setValidationMessage('');
        setDetailBlocks((previous)=>previous.map((block)=>block.id === blockId ? {
                    ...block,
                    ...updates
                } : block));
    }
    function addDetailBlock() {
        setDetailBlocks((previous)=>[
                ...previous,
                createEmptyDetailBlock()
            ]);
    }
    function removeDetailBlock(blockId) {
        setDetailBlocks((previous)=>previous.length === 1 ? previous : previous.filter((block)=>block.id !== blockId));
    }
    function handleImageDrop(event, blockId) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            updateDetailBlock(blockId, {
                imageName: file.name,
                imageUrl: URL.createObjectURL(file)
            });
        }
    }
    function handleImageSelect(blockId, file) {
        updateDetailBlock(blockId, {
            imageName: file?.name ?? '',
            imageUrl: file ? URL.createObjectURL(file) : ''
        });
    }
    async function createGuidebook() {
        const hasEmptyRequiredField = detailBlocks.some((block)=>block.title.trim().length === 0 || block.subtitle.trim().length === 0 || block.content.trim().length === 0);
        if (hasEmptyRequiredField) {
            setValidationMessage('제목과 내용을 입력해주세요');
            return;
        }
        const normalizedBlocks = detailBlocks.map((block, index)=>({
                ...block,
                title: block.title.trim(),
                subtitle: block.subtitle.trim(),
                content: block.content.trim(),
                imageUrl: block.imageUrl || `/images/guidebooks/user8-${Math.min(index + 1, 6)}.jpeg`
            }));
        const title = normalizedBlocks[0]?.title || `${selectedLocation.city} 새 가이드북`;
        try {
            setIsCreating(true);
            setValidationMessage('');
            await onCreate({
                country: selectedLocation.country,
                region: selectedLocation.city,
                coverImageUrl: normalizedBlocks[0]?.imageUrl || '/images/guidebooks/user8-1.jpeg',
                mapImageUrl: selectedLocation.mapImageUrl,
                routePoints: routePoints.map((point, index)=>({
                        ...point,
                        pointOrder: index + 1,
                        title: `포인트 ${index + 1}`
                    })),
                title,
                blocks: normalizedBlocks
            });
        } catch  {
            setValidationMessage('가이드북 생성에 실패했습니다');
        } finally{
            setIsCreating(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "create-guidebook-layer",
        role: "presentation",
        onMouseDown: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "create-guidebook-modal",
            "aria-label": "가이드북 생성",
            onMouseDown: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "create-guidebook-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Create guidebook"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: mode === 'edit' ? '가이드북 수정' : '가이드북 생성'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: mode === 'edit' ? '기존 가이드북 정보를 수정합니다.' : '영상 링크와 위치 정보를 먼저 정리합니다.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": "가이드북 생성 닫기",
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "create-guidebook-body",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "create-guidebook-control-group full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "영상 링크"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "create-guidebook-link-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "url",
                                            placeholder: "유튜브 링크 첨부",
                                            value: videoUrl,
                                            onChange: (event)=>setVideoUrl(event.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: readVideo,
                                            children: "읽기"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "create-guidebook-control-group compact",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "지역 · 도시"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "create-guidebook-location-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: selectedLocation.country,
                                                onChange: (event)=>{
                                                    const nextLocation = availableLocationOptions.find((option)=>option.country === event.target.value) ?? availableLocationOptions[0];
                                                    setSelectedLocation(nextLocation);
                                                },
                                                children: [
                                                    ...new Set(availableLocationOptions.map((option)=>option.country))
                                                ].map((country)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: country,
                                                        children: country
                                                    }, country, false, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: selectedLocation.city,
                                                onChange: (event)=>{
                                                    const nextLocation = availableLocationOptions.find((option)=>option.city === event.target.value) ?? selectedLocation;
                                                    setSelectedLocation(nextLocation);
                                                },
                                                children: availableLocationOptions.filter((option)=>option.country === selectedLocation.country).map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: option.city,
                                                        children: option.city
                                                    }, option.city, false, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                lineNumber: 230,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "create-guidebook-map-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: selectedLocation.city
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 248,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                selectedLocation.country,
                                                " 기준으로 가이드북 맵이 구성됩니다."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "create-guidebook-map",
                                    onPointerMove: moveActivePoint,
                                    onPointerUp: ()=>setActivePointId(null),
                                    onPointerLeave: ()=>setActivePointId(null),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: selectedLocation.mapImageUrl,
                                            alt: `${selectedLocation.city} 지도`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 256,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "create-guidebook-route-line",
                                            viewBox: "0 0 100 100",
                                            preserveAspectRatio: "none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: routePoints.map((point)=>`${point.x},${point.y}`).join(' '),
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "1.8"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                lineNumber: 258,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 257,
                                            columnNumber: 15
                                        }, this),
                                        routePoints.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: activePointId === point.id ? 'create-guidebook-route-point active' : 'create-guidebook-route-point',
                                                style: {
                                                    left: `${point.x}%`,
                                                    top: `${point.y}%`
                                                },
                                                type: "button",
                                                onPointerDown: (event)=>{
                                                    event.preventDefault();
                                                    event.currentTarget.setPointerCapture(event.pointerId);
                                                    setActivePointId(point.id);
                                                },
                                                children: index + 1
                                            }, point.id, false, {
                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                lineNumber: 268,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "create-guidebook-detail-section",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "create-guidebook-fieldset-title",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "가이드북 페이지"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        detailBlocks.length,
                                                        "개 페이지"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 286,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: addDetailBlock,
                                            "aria-label": "가이드북 페이지 추가",
                                            children: "+"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                            lineNumber: 290,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this),
                                detailBlocks.map((block, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "create-guidebook-detail-block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "create-guidebook-detail-block-title",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Page ",
                                                            index + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>removeDetailBlock(block.id),
                                                        disabled: detailBlocks.length === 1,
                                                        children: "삭제"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "create-guidebook-image-drop",
                                                onDragOver: (event)=>event.preventDefault(),
                                                onDrop: (event)=>handleImageDrop(event, block.id),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: "image/*",
                                                        onChange: (event)=>handleImageSelect(block.id, event.target.files?.[0])
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 19
                                                    }, this),
                                                    block.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: block.imageUrl,
                                                        alt: `${block.title || `페이지 ${index + 1}`} 첨부 이미지`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: block.imageName || '사진 첨부'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "드래그하거나 클릭해서 이미지를 넣어주세요"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                                lineNumber: 319,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                lineNumber: 305,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "create-guidebook-page-fields",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "create-guidebook-text-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "타이틀"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                                lineNumber: 326,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                placeholder: "장소 또는 장면 타이틀",
                                                                value: block.title,
                                                                onChange: (event)=>updateDetailBlock(block.id, {
                                                                        title: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                                lineNumber: 327,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "create-guidebook-text-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "위치"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                placeholder: "지역, 위치, 이동 포인트",
                                                                value: block.subtitle,
                                                                onChange: (event)=>updateDetailBlock(block.id, {
                                                                        subtitle: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                                lineNumber: 337,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "create-guidebook-text-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "내용"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                placeholder: "읽기 버튼을 누르면 분석된 내용이 임시로 들어옵니다.",
                                                                value: block.content,
                                                                onChange: (event)=>updateDetailBlock(block.id, {
                                                                        content: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                                lineNumber: 324,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, block.id, true, {
                                        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "create-guidebook-footer",
                    children: [
                        validationMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            role: "alert",
                            children: validationMessage
                        }, void 0, false, {
                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                            lineNumber: 360,
                            columnNumber: 33
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "primary",
                                    onClick: ()=>void createGuidebook(),
                                    disabled: isCreating,
                                    children: isCreating ? mode === 'edit' ? '수정 중' : '생성 중' : mode === 'edit' ? '수정' : '생성'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                                    lineNumber: 363,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                            lineNumber: 361,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
                    lineNumber: 359,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/creator/CreateGuidebookModal.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
_s(CreateGuidebookModal, "LkMIyYthim4EtdwHtXA12wLJTVk=");
_c = CreateGuidebookModal;
var _c;
__turbopack_context__.k.register(_c, "CreateGuidebookModal");
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
"[project]/src/features/creator/creatorGuidebookManage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addDeletedGuidebookId",
    ()=>addDeletedGuidebookId,
    "readDeletedGuidebookIds",
    ()=>readDeletedGuidebookIds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/account/currentAccount.ts [app-client] (ecmascript)");
;
const DELETED_GUIDEBOOK_STORAGE_KEY = `tripstack.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].role}.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId}.deletedGuidebookIds`;
function normalizeGuidebookIds(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.filter((item)=>Number.isInteger(item));
}
function readGuidebookIds(storageKey) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return normalizeGuidebookIds(JSON.parse(window.localStorage.getItem(storageKey) ?? '[]'));
    } catch  {
        return [];
    }
}
function writeGuidebookIds(storageKey, guidebookIds) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const uniqueGuidebookIds = [
        ...new Set(guidebookIds)
    ];
    window.localStorage.setItem(storageKey, JSON.stringify(uniqueGuidebookIds));
    return uniqueGuidebookIds;
}
function readDeletedGuidebookIds() {
    return readGuidebookIds(DELETED_GUIDEBOOK_STORAGE_KEY);
}
function addDeletedGuidebookId(guidebookId) {
    return writeGuidebookIds(DELETED_GUIDEBOOK_STORAGE_KEY, [
        ...readDeletedGuidebookIds(),
        guidebookId
    ]);
}
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
"[project]/src/components/creator/CreatorStudioFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreatorStudioFeed",
    ()=>CreatorStudioFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$TopTabBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/TopTabBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$creator$2f$CreateGuidebookModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/creator/CreateGuidebookModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$guidebook$2f$GuidebookPrintDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/guidebook/GuidebookPrintDetailModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/account/currentAccount.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/basket/printCartStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$creator$2f$creatorGuidebookManage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/creator/creatorGuidebookManage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/interest/creatorInterest.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/guidebookService.ts [app-client] (ecmascript)");
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
            fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = HeartIcon;
function CreatorStudioFeed({ creators, guidebooks, viewedCreatorId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('mine');
    const [deletedGuidebookIds, setDeletedGuidebookIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedGuidebook, setSelectedGuidebook] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedBlocks, setSelectedBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isCreateGuidebookOpen, setIsCreateGuidebookOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInterestPanelOpen, setIsInterestPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [interestedCreatorIds, setInterestedCreatorIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [createdGuidebooks, setCreatedGuidebooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [createdGuidebookBlocks, setCreatedGuidebookBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [editingGuidebook, setEditingGuidebook] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingBlocks, setEditingBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [updatedGuidebooks, setUpdatedGuidebooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [updatedGuidebookBlocks, setUpdatedGuidebookBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const basketGuidebookIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"])({
        "CreatorStudioFeed.usePrintCartStore[basketGuidebookIds]": (state)=>state.guidebookIds
    }["CreatorStudioFeed.usePrintCartStore[basketGuidebookIds]"]);
    const loadCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"])({
        "CreatorStudioFeed.usePrintCartStore[loadCart]": (state)=>state.loadCart
    }["CreatorStudioFeed.usePrintCartStore[loadCart]"]);
    const creator = creators.find((item)=>item.id === viewedCreatorId);
    const isOwnCreator = viewedCreatorId === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreatorStudioFeed.useEffect": ()=>{
            setDeletedGuidebookIds((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$creator$2f$creatorGuidebookManage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readDeletedGuidebookIds"])());
            setInterestedCreatorIds((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readInterestedCreatorIds"])());
            function syncInterestedCreators(event) {
                setInterestedCreatorIds(event.detail ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readInterestedCreatorIds"])());
            }
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTERESTED_CREATOR_EVENT_NAME"], syncInterestedCreators);
            return ({
                "CreatorStudioFeed.useEffect": ()=>window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTERESTED_CREATOR_EVENT_NAME"], syncInterestedCreators)
            })["CreatorStudioFeed.useEffect"];
        }
    }["CreatorStudioFeed.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreatorStudioFeed.useEffect": ()=>{
            void loadCart();
        }
    }["CreatorStudioFeed.useEffect"], [
        loadCart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreatorStudioFeed.useEffect": ()=>{
            function closeOnEscape(event) {
                if (event.key === 'Escape') {
                    setSelectedGuidebook(null);
                    setSelectedBlocks([]);
                    setIsCreateGuidebookOpen(false);
                }
            }
            document.addEventListener('keydown', closeOnEscape);
            return ({
                "CreatorStudioFeed.useEffect": ()=>document.removeEventListener('keydown', closeOnEscape)
            })["CreatorStudioFeed.useEffect"];
        }
    }["CreatorStudioFeed.useEffect"], []);
    if (!creator) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "empty-state",
            children: "크리에이터 정보를 불러오는 중입니다."
        }, void 0, false, {
            fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
            lineNumber: 93,
            columnNumber: 12
        }, this);
    }
    const availableGuidebooks = (isOwnCreator ? [
        ...createdGuidebooks,
        ...guidebooks
    ] : guidebooks).map((guidebook)=>updatedGuidebooks[guidebook.id] ?? guidebook);
    const creatorGuidebooks = availableGuidebooks.filter((guidebook)=>{
        if (guidebook.creatorId !== creator.id) {
            return false;
        }
        if (!isOwnCreator) {
            return true;
        }
        return !deletedGuidebookIds.includes(guidebook.id);
    });
    const savedGuidebooks = isOwnCreator ? availableGuidebooks.filter((guidebook)=>guidebook.creatorId !== creator.id && basketGuidebookIds.includes(guidebook.id)) : [];
    const visibleGuidebooks = isOwnCreator && activeTab === 'saved' ? savedGuidebooks : creatorGuidebooks;
    const selectedGuidebookCreator = creators.find((item)=>item.id === selectedGuidebook?.creatorId);
    const interestedCreators = creators.filter((item)=>interestedCreatorIds.includes(item.id));
    const isViewedCreatorInterested = interestedCreatorIds.includes(creator.id);
    const visibleFollowerCount = isViewedCreatorInterested ? 1 : 0;
    async function openPrintDetail(guidebook) {
        setSelectedGuidebook(guidebook);
        setSelectedBlocks([]);
        const localBlocks = updatedGuidebookBlocks[guidebook.id] ?? createdGuidebookBlocks[guidebook.id];
        if (localBlocks) {
            setSelectedBlocks(localBlocks);
            return;
        }
        setSelectedBlocks(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].getGuidebookBlocks(guidebook.id));
    }
    function createGuidebook() {
        setEditingGuidebook(null);
        setEditingBlocks([]);
        setIsCreateGuidebookOpen(true);
    }
    function closePrintDetail() {
        setSelectedGuidebook(null);
        setSelectedBlocks([]);
    }
    async function deleteSelectedGuidebook() {
        if (!selectedGuidebook) {
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].deleteGuidebook(selectedGuidebook.id);
        setDeletedGuidebookIds((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$creator$2f$creatorGuidebookManage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDeletedGuidebookId"])(selectedGuidebook.id));
        setCreatedGuidebooks((previous)=>previous.filter((guidebook)=>guidebook.id !== selectedGuidebook.id));
        setCreatedGuidebookBlocks((previous)=>{
            const { [selectedGuidebook.id]: _removed, ...nextBlocks } = previous;
            return nextBlocks;
        });
        closePrintDetail();
    }
    async function editSelectedGuidebook() {
        if (!selectedGuidebook) {
            return;
        }
        const blocks = selectedBlocks.length > 0 ? selectedBlocks : await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].getGuidebookBlocks(selectedGuidebook.id);
        setEditingGuidebook(selectedGuidebook);
        setEditingBlocks(blocks);
        closePrintDetail();
        setIsCreateGuidebookOpen(true);
    }
    function toggleViewedCreatorInterest() {
        if (isOwnCreator || !creator) {
            return;
        }
        setInterestedCreatorIds((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$interest$2f$creatorInterest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleInterestedCreatorId"])(creator.id));
    }
    async function createGuidebookFromDraft(draft) {
        if (!creator) {
            return;
        }
        if (editingGuidebook) {
            const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].updateGuidebook(editingGuidebook.id, {
                creatorId: creator.id,
                title: draft.title,
                country: draft.country,
                region: draft.region,
                coverImageUrl: draft.coverImageUrl,
                mapImageUrl: draft.mapImageUrl,
                routePoints: draft.routePoints.map((point)=>({
                        pointOrder: point.pointOrder,
                        title: point.title,
                        x: point.x,
                        y: point.y
                    })),
                blocks: draft.blocks.map((block)=>({
                        placeName: block.title,
                        content: block.content,
                        imageUrl: block.imageUrl
                    }))
            });
            setUpdatedGuidebooks((previous)=>({
                    ...previous,
                    [updated.guidebook.id]: updated.guidebook
                }));
            setUpdatedGuidebookBlocks((previous)=>({
                    ...previous,
                    [updated.guidebook.id]: updated.blocks
                }));
            setCreatedGuidebooks((previous)=>previous.map((guidebook)=>guidebook.id === updated.guidebook.id ? updated.guidebook : guidebook));
            setCreatedGuidebookBlocks((previous)=>({
                    ...previous,
                    [updated.guidebook.id]: updated.blocks
                }));
            setEditingGuidebook(null);
            setEditingBlocks([]);
            setActiveTab('mine');
            setIsCreateGuidebookOpen(false);
            return;
        }
        const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$guidebookService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guidebookService"].createGuidebook({
            creatorId: creator.id,
            title: draft.title,
            country: draft.country,
            region: draft.region,
            coverImageUrl: draft.coverImageUrl,
            mapImageUrl: draft.mapImageUrl,
            routePoints: draft.routePoints.map((point)=>({
                    pointOrder: point.pointOrder,
                    title: point.title,
                    x: point.x,
                    y: point.y
                })),
            blocks: draft.blocks.map((block)=>({
                    placeName: block.title,
                    content: block.content,
                    imageUrl: block.imageUrl
                }))
        });
        setCreatedGuidebooks((previous)=>[
                created.guidebook,
                ...previous
            ]);
        setCreatedGuidebookBlocks((previous)=>({
                ...previous,
                [created.guidebook.id]: created.blocks
            }));
        setActiveTab('mine');
        setIsCreateGuidebookOpen(false);
    }
    function createEditingDraft(guidebook, blocks) {
        return {
            blocks: blocks.map((block)=>({
                    content: block.content,
                    id: block.id,
                    imageName: '',
                    imageUrl: block.imageUrl,
                    subtitle: guidebook.region,
                    title: block.placeName
                })),
            country: guidebook.country,
            coverImageUrl: guidebook.coverImageUrl,
            mapImageUrl: guidebook.mapImageUrl,
            region: guidebook.region,
            routePoints: guidebook.routePoints,
            title: guidebook.title
        };
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$TopTabBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopTabBar"], {
                mode: isOwnCreator ? 'creator' : 'cart',
                isInterestOpen: isInterestPanelOpen,
                interestCount: interestedCreators.length,
                onInterestToggle: ()=>setIsInterestPanelOpen((previous)=>!previous)
            }, void 0, false, {
                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "creator-studio-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "creator-profile-summary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: creator.avatarUrl,
                                alt: `${creator.username} profile`
                            }, void 0, false, {
                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "creator-profile-title-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: creator.username
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 279,
                                                columnNumber: 15
                                            }, this),
                                            !isOwnCreator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: isViewedCreatorInterested ? 'creator-profile-heart active' : 'creator-profile-heart',
                                                type: "button",
                                                "aria-label": isViewedCreatorInterested ? '관심 크리에이터 해제' : '관심 크리에이터 추가',
                                                "aria-pressed": isViewedCreatorInterested,
                                                onClick: toggleViewedCreatorInterest,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeartIcon, {}, void 0, false, {
                                                    fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 281,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: creator.bio
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "creator-profile-stats",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "출판수 ",
                                                    formatCompactCount(creator.followerCount)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "팔로워 ",
                                                    visibleFollowerCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 294,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    creatorGuidebooks.length,
                                                    "개 가이드북"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 295,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "creator-library",
                        children: [
                            isOwnCreator ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "creator-library-tabs",
                                        role: "tablist",
                                        "aria-label": "크리에이터 가이드북 탭",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: activeTab === 'mine' ? 'active' : '',
                                                type: "button",
                                                role: "tab",
                                                "aria-selected": activeTab === 'mine',
                                                onClick: ()=>setActiveTab('mine'),
                                                children: "내 가이드북"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: activeTab === 'saved' ? 'active' : '',
                                                type: "button",
                                                role: "tab",
                                                "aria-selected": activeTab === 'saved',
                                                onClick: ()=>setActiveTab('saved'),
                                                children: "인쇄목록 가이드북"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "creator-library-divider"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 322,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "creator-public-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Guidebooks"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 326,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: [
                                            creator.username,
                                            "의 가이드북"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 327,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this),
                            activeTab === 'saved' && visibleGuidebooks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "empty-state",
                                children: "아직 표시할 가이드북이 없습니다."
                            }, void 0, false, {
                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "creator-guidebook-grid",
                                children: [
                                    visibleGuidebooks.map((guidebook)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "creator-guidebook-card",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void openPrintDetail(guidebook),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: guidebook.coverImageUrl,
                                                        alt: `${guidebook.title} cover`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: guidebook.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    guidebook.region,
                                                                    " · ",
                                                                    guidebook.country
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    formatCompactCount(guidebook.printCount),
                                                                    " 조회수"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this)
                                        }, guidebook.id, false, {
                                            fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, this)),
                                    isOwnCreator && activeTab === 'mine' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "creator-guidebook-card creator-guidebook-create-card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": "가이드북 생성",
                                            onClick: createGuidebook,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 350,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                            lineNumber: 349,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 348,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            selectedGuidebook && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$guidebook$2f$GuidebookPrintDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GuidebookPrintDetailModal"], {
                blocks: selectedBlocks,
                canManage: selectedGuidebook.creatorId === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId,
                creator: selectedGuidebookCreator,
                guidebook: selectedGuidebook,
                onClose: closePrintDetail,
                onDelete: deleteSelectedGuidebook,
                onEdit: ()=>void editSelectedGuidebook(),
                showBasketAction: selectedGuidebook.creatorId !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$account$2f$currentAccount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentAccount"].creatorId
            }, void 0, false, {
                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                lineNumber: 360,
                columnNumber: 9
            }, this),
            isCreateGuidebookOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$creator$2f$CreateGuidebookModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateGuidebookModal"], {
                initialDraft: editingGuidebook ? createEditingDraft(editingGuidebook, editingBlocks) : undefined,
                mode: editingGuidebook ? 'edit' : 'create',
                onClose: ()=>{
                    setEditingGuidebook(null);
                    setEditingBlocks([]);
                    setIsCreateGuidebookOpen(false);
                },
                onCreate: createGuidebookFromDraft
            }, void 0, false, {
                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                lineNumber: 373,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: isInterestPanelOpen ? 'interest-creator-panel open' : 'interest-creator-panel',
                "aria-label": "관심 크리에이터",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "interest-creator-panel-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "관심 크리에이터"
                            }, void 0, false, {
                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "관심 크리에이터 닫기",
                                onClick: ()=>setIsInterestPanelOpen(false),
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "interest-creator-list",
                        children: interestedCreators.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "empty-state",
                            children: "아직 관심 크리에이터가 없습니다."
                        }, void 0, false, {
                            fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                            lineNumber: 394,
                            columnNumber: 13
                        }, this) : interestedCreators.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "interest-creator-row",
                                type: "button",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: item.avatarUrl,
                                        alt: `${item.username} profile`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 398,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: item.username
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 400,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: formatCompactCount(item.followerCount)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                                lineNumber: 401,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                        lineNumber: 399,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                                lineNumber: 397,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/creator/CreatorStudioFeed.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(CreatorStudioFeed, "6Wsu+L+pe30wep6do5HwKxDvXOs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$basket$2f$printCartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrintCartStore"]
    ];
});
_c1 = CreatorStudioFeed;
var _c, _c1;
__turbopack_context__.k.register(_c, "HeartIcon");
__turbopack_context__.k.register(_c1, "CreatorStudioFeed");
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
"[project]/src/app/creator/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreatorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/AppHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$creator$2f$CreatorStudioFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/creator/CreatorStudioFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$hooks$2f$useGuidebookCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/guidebook/hooks/useGuidebookCatalog.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CreatorPage() {
    _s();
    const { creators, error, guidebooks, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$hooks$2f$useGuidebookCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGuidebookCatalog"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppHeader"], {
                compact: true,
                title: "크리에이터 스튜디오"
            }, void 0, false, {
                fileName: "[project]/src/app/creator/page.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-message",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/creator/page.tsx",
                lineNumber: 13,
                columnNumber: 17
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "empty-state",
                children: "크리에이터 데이터를 불러오는 중입니다."
            }, void 0, false, {
                fileName: "[project]/src/app/creator/page.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$creator$2f$CreatorStudioFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreatorStudioFeed"], {
                creators: creators,
                guidebooks: guidebooks
            }, void 0, false, {
                fileName: "[project]/src/app/creator/page.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/creator/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_s(CreatorPage, "lUm2vkjPeKxKfowuu1RiFA5E6GQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$guidebook$2f$hooks$2f$useGuidebookCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGuidebookCatalog"]
    ];
});
_c = CreatorPage;
var _c;
__turbopack_context__.k.register(_c, "CreatorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1afa5ek._.js.map