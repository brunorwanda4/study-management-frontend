import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// date
export const todayISO = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

/**
 * Helper: recursively collect errors from react-hook-form's formState.errors
 * Returns array of { path: string, message: string }
 */
// const collectErrors = (
//   errObj: any,
//   prefix = "",
// ): { path: string; message: string }[] => {
//   const results: { path: string; message: string }[] = [];
//   if (!errObj || typeof errObj !== "object") return results;

//   for (const key of Object.keys(errObj)) {
//     const val = errObj[key];
//     const currentPath = prefix ? `${prefix}.${key}` : key;

//     if (!val) continue;

//     // Direct message
//     if (typeof val.message === "string" && val.message.trim() !== "") {
//       results.push({ path: currentPath, message: val.message });
//     }

//     // sometimes zod/resolver places messages under `types`
//     if (val.types && typeof val.types === "object") {
//       for (const tKey of Object.keys(val.types)) {
//         const msg = val.types[tKey];
//         if (typeof msg === "string" && msg.trim() !== "") {
//           results.push({ path: `${currentPath}.${tKey}`, message: msg });
//         }
//       }
//     }

//     // nested child errors (e.g. address: { country: { message: '...' }})
//     // Avoid re-visiting known keys to prevent duplication
//     for (const childKey of Object.keys(val)) {
//       if (["message", "types"].includes(childKey)) continue;
//       const child = val[childKey];
//       if (child && typeof child === "object") {
//         // recursively collect using currentPath as prefix
//         results.push(...collectErrors({ [childKey]: child }, currentPath));
//       }
//     }
//   }

//   return results;
// };

// const errorsList = useMemo(() => {
//   return collectErrors(form.formState.errors);
// }, [form.formState.errors]);

//  ---------------HTML ------------------------
//  {errorsList.length > 0 && (
//           <div className="p-3 bg-red-50 border border-red-200 rounded space-y-2">
//             <div className="text-sm font-semibold text-red-800">
//               Please fix the following validation errors:
//             </div>
//             <div className="text-sm space-y-1">
//               {errorsList.map((e) => (
//                 <div key={e.path} className="flex items-start gap-2">
//                   <div className="font-mono text-xs text-red-700 w-44 truncate">
//                     {e.path}
//                   </div>
//                   <div className="text-red-600 text-sm">{e.message}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
