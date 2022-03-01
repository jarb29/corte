// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  {
    subheader: 'Components',
    items: [
      {
        title: 'Components',
        path: PATH_DASHBOARD.components.components,
        icon: ICONS.analytics
      }
    ]
  },
  // AMESTI
  // ----------------------------------------------------------------------
  {
    subheader: 'amesti',
    items: [
      // AMESTI : TIEMPOS
      {
        title: 'Corte',
        path: PATH_DASHBOARD.amesti.root,
        icon: ICONS.user,
        children: [
          { title: 'cargar archivo nest', path: PATH_DASHBOARD.amesti.uploadS3 },
          { title: 'seleccion de pieza critica', path: PATH_DASHBOARD.amesti.tableNestS3 },
          { title: 'seleccion de nest/tiempo', path: PATH_DASHBOARD.amesti.TableSelectedNest },
          { title: 'Estufas/Tiempo', path: PATH_DASHBOARD.amesti.AnalyticsTimePage },
          { title: 'Analytics', path: PATH_DASHBOARD.amesti.banking }
        ]
      }
    ]
  }
];

export default sidebarConfig;
