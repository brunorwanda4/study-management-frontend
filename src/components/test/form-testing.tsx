// const AllFormErrors = ({ errors }: { errors: any }) => {
//     const flatErrors = Object.values(errors).flatMap((err: any) => {
//       if (!err) return [];
//       if (Array.isArray(err)) return err.map((e) => e.message);
//       if (err.message) return [err.message];
//       return [];
//     });

//     if (flatErrors.length === 0) return null;

//     return (
//       <div className="bg-base-300 border border-red-300 text-red-700 p-3 rounded-lg space-y-1">
//         {flatErrors.map((msg, i) => (
//           <p key={i} className="text-sm">• {msg}</p>
//         ))}
//       </div>
//     );
//   };

//   <AllFormErrors errors={form.formState.errors} />
