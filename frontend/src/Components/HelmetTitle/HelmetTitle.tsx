import { Helmet } from 'react-helmet-async';

const HelmetTitle = ({title}:{title:string}) => {
  return (
    <Helmet>
    <title>{title?title:'فروشگاه کفش شهاب'}</title>
  </Helmet>
  )
}

export default HelmetTitle;