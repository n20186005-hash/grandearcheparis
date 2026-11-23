import type { Locale } from '@/i18n/routing';

const details = {
  en: {
    title: 'Management and public access',
    text: 'Paris La Défense, the local public institution for the district, manages the public spaces around the arch. The Grande Arche houses government and private offices with separate access. Follow signs at the Parvis for public access around the building.',
    district: 'Paris La Défense public authority',
    building: 'Official Grande Arche record',
  },
  fr: {
    title: 'Gestion et accès du public',
    text: 'L’établissement public Paris La Défense gère les espaces publics autour de l’arche. La Grande Arche abrite des bureaux de l’État et des bureaux privés dont les accès sont distincts. Sur le parvis, suivez la signalétique des espaces ouverts au public.',
    district: 'Établissement public Paris La Défense',
    building: 'Fiche officielle de la Grande Arche',
  },
  es: {
    title: 'Gestión y acceso público',
    text: 'Paris La Défense, la entidad pública del distrito, gestiona los espacios públicos que rodean el arco. La Grande Arche alberga oficinas estatales y privadas con accesos independientes. En la explanada, sigue las indicaciones para acceder a los espacios públicos.',
    district: 'Entidad pública Paris La Défense',
    building: 'Ficha oficial del Gran Arco',
  },
  zh: {
    title: '管理机构与公共通行',
    text: '地方公共机构 Paris La Défense 负责大拱门周围公共空间的管理。大拱门内设有政府及私人办公场所，办公入口各有规定。在广场参观外部时，请按现场公共通行标识行走。',
    district: 'Paris La Défense 公共机构',
    building: '大拱门官方资料',
  },
};

export default function ArcheManagement({ locale }: { locale: Locale }) {
  const text = details[locale];
  return (
    <section className="mt-6" style={{ color: 'var(--text-secondary)' }}>
      <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{text.title}</h3>
      <p className="mt-2 leading-relaxed">{text.text}</p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <a className="underline" style={{ color: 'var(--accent)' }} href="https://www.parisladefense.com/en/who-we-are">{text.district}</a>
        <a className="underline" style={{ color: 'var(--accent)' }} href="https://www.parisladefense.com/en/district/towers-buildings/grande-arche">{text.building}</a>
      </div>
    </section>
  );
}
