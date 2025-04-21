import SchoolClasses from '@/components/page/school/school-classese';
import { Locale } from '@/i18n';
import { getAuthUserServer } from '@/lib/utils/auth';
import { redirect } from 'next/navigation';
import React from 'react'
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolClassesPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = await getAuthUserServer()
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=' px-4 space-x-4'>
      <SchoolClasses onThePage className=' grid-cols-2' lang={lang} />
    </div>
  )
}

export default SchoolClassesPage
