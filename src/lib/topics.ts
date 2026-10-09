// Subtopic content for the Grande Arche de la Défense guide.
// Each topic has locale-specific slugs (French slugs follow the SEO audit's
// recommended URLs) and full content in zh/en/fr.

export type Locale = 'zh' | 'en' | 'fr' | 'es';
export type TopicKey = 'visiting' | 'rooftop-closed' | 'getting-there';

export interface TopicContent {
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
}

export interface Topic {
  key: TopicKey;
  slugs: Record<Locale, string>;
  content: Record<Locale, TopicContent>;
}

export const TOPICS: Topic[] = [
  {
    key: 'visiting',
    slugs: {
      zh: 'visiting',
      en: 'visiting-the-arche',
      fr: 'visiter-grande-arche-defense',
      es: 'visitar-la-grande-arche',
    },
    content: {
      zh: {
        title: '如何参观拉德芳斯大拱门',
        metaTitle: '参观拉德芳斯大拱门：外部免费、广场与拍照攻略',
        metaDescription:
          '拉德芳斯大拱门怎么参观？外部与拉德芳斯广场免费开放，屋顶观景台自 2023 年 4 月起关闭。本文说明可看区域、最佳拍照时间与交通。',
        intro:
          '拉德芳斯大拱门（La Grande Arche de la Défense）是一座高 110 米的白色大理石“中空”立方体，矗立于巴黎西郊拉德芳斯商务区。它免费对公众开放——你不需要门票，也无需预约，即可从外部与周边广场自由欣赏这座现代建筑杰作。',
        sections: [
          {
            heading: '位置与到达',
            body: '大拱门位于上塞纳省皮托市（Puteaux），地址 1 Parv. de la Défense, 92800。最便捷的方式是搭乘地铁 1 号线或 RER A 线至 La Défense – Grande Arche 站，出站穿过拉德芳斯广场步行即达。',
          },
          {
            heading: '免费可看的区域',
            body: '纪念碑外观、拉德芳斯广场（esplanade）与公共空间均可免费参观。从中庭向东望去，洁白的镂空“窗框”正好框住历史轴线——远处的凯旋门、香榭丽舍大街与卢浮宫依次排列。',
          },
          {
            heading: '屋顶观景台已关闭',
            body: '屋顶平台（Le Toit）自 2023 年 4 月起已对公众永久关闭，顶部不再提供付费参观、展览或登顶活动。请勿为“登顶”而来；把行程安排在地面广场与建筑外观上。',
          },
          {
            heading: '最佳拍照时间',
            body: '清晨与黄昏光线最柔和，白色大理石立面在日落时分尤为出片。工作日人少，适合拍摄纯净的建筑几何线条与广场全景。',
          },
        ],
        faq: [
          {
            q: '参观拉德芳斯大拱门需要门票吗？',
            a: '不需要。纪念碑外观、拉德芳斯广场与公共空间均免费开放。屋顶观景台自 2023 年 4 月起已关闭，因此也没有任何登顶门票可购买。',
          },
          {
            q: '可以在大拱门内部参观吗？',
            a: '两翼为办公空间，不对外开放；公众可从外部广场与中庭自由欣赏建筑。透过镂空中庭，你能看到沿历史轴线排列的凯旋门与香榭丽舍大街。',
          },
          {
            q: '参观大约需要多久？',
            a: '仅外观与广场，约 30–60 分钟足够；若结合拉德芳斯现代建筑群散步，可安排半天。',
          },
        ],
      },
      en: {
        title: 'Visiting the Grande Arche de la Défense',
        metaTitle:
          'Visiting the Grande Arche de la Défense: free exterior, esplanade & photo tips',
        metaDescription:
          'How to visit the Grande Arche de la Défense: the exterior and esplanade are free, the rooftop has been closed since 2023. Directions, what you can see and the best time to go.',
        intro:
          'The Grande Arche de la Défense (La Grande Arche) is a 110-metre white-marble hollow cube at the heart of Paris’s La Défense business district. It is free to visit — no ticket and no booking needed — and you can admire this modern masterpiece from outside and across the surrounding esplanade.',
        sections: [
          {
            heading: 'Location & getting there',
            body: 'The Arche stands in Puteaux (Hauts-de-Seine), at 1 Parv. de la Défense, 92800. The easiest way is Métro line 1 or RER A to La Défense – Grande Arche; cross the esplanade on foot to reach it.',
          },
          {
            heading: 'What you can see for free',
            body: 'The monument’s exterior, the La Défense esplanade and the public plaza are all free to explore. From inside the hollow frame, look east: the white “window” lines up the historic axis — the Arc de Triomphe, the Champs-Élysées and the Louvre in one view.',
          },
          {
            heading: 'The rooftop is closed',
            body: 'The rooftop terrace (Le Toit) has been permanently closed to the public since April 2023. There are no paid visits, exhibitions or “summit” access at the top, so don’t plan a trip around going up.',
          },
          {
            heading: 'Best time for photos',
            body: 'Early morning and dusk give the softest light, and the white marble facade glows at sunset. Weekdays are quieter, ideal for clean shots of the geometry and the full esplanade.',
          },
        ],
        faq: [
          {
            q: 'Do I need a ticket to visit the Grande Arche?',
            a: 'No. The exterior, the La Défense esplanade and the public plaza are free to visit. The rooftop has been closed since April 2023, so there is no summit ticket to buy either.',
          },
          {
            q: 'Can I go inside the Grande Arche?',
            a: 'The two wings are offices and are not open to the public; visitors admire the structure from the outside plaza and the hollow central frame, which frames the Arc de Triomphe and the Champs-Élysées along the historic axis.',
          },
          {
            q: 'How long should I plan for a visit?',
            a: 'The exterior and esplanade take about 30–60 minutes; allow half a day if you also walk the La Défense modern-architecture cluster.',
          },
        ],
      },
      fr: {
        title: 'Visiter la Grande Arche de la Défense',
        metaTitle:
          'Visiter la Grande Arche de la Défense : accès gratuit, esplanade, photos et conseils',
        metaDescription:
          'Comment visiter la Grande Arche de la Défense gratuitement : extérieur et esplanade libres d’accès, toit fermé depuis 2023. Accès depuis Paris, ce qu’on peut voir, meilleur moment pour les photos et durée de la visite.',
        intro:
          'La Grande Arche de la Défense est un cube évidé de marbre blanc de 110 mètres, au cœur du quartier d’affaires de La Défense à l’ouest de Paris, sur l’axe historique qui relie le Louvre à l’Arc de Triomphe. Sa visite est gratuite — aucun billet ni réservation n’est nécessaire — et l’on peut admirer ce chef-d’œuvre de l’architecture moderne depuis l’extérieur et sur l’esplanade qui l’entoure, à toute heure et en toute saison.',
        sections: [
          {
            heading: 'Localisation et accès',
            body: 'L’Arche se situe à Puteaux (Hauts-de-Seine), 1 Parvis de la Défense, 92800, à l’ouest de Paris. Le plus simple est le métro ligne 1 ou le RER A jusqu’à La Défense – Grande Arche ; en sortant, on rejoint le monument à pied en traversant l’esplanade, en quelques minutes.',
          },
          {
            heading: 'Ce que l’on peut voir gratuitement',
            body: 'L’extérieur du monument, l’esplanade de La Défense et la place publique se visitent librement. Depuis le cadre évidé, regardez vers l’est : la « fenêtre » blanche encadre l’axe historique de 12 km — l’Arc de Triomphe, les Champs-Élysées et le Louvre alignés dans un même cadre.',
          },
          {
            heading: 'Le toit (Le Toit) est fermé depuis 2023',
            body: 'La terrasse du toit (Le Toit) est fermée au public de façon permanente depuis avril 2023. Il n’y a ni visite payante, ni exposition, ni accès « au sommet » : ne planifiez pas votre venue autour d’une montée, et concentrez la visite sur le niveau du sol.',
          },
          {
            heading: 'L’esplanade et le cluster d’architecture moderne',
            body: 'Autour de l’Arche, l’esplanade permet de rejoindre à pied le CNIT et le centre commercial Westfield Les Quatre Temps, ainsi que les tours emblématiques de La Défense. Les communes voisines — Puteaux, Neuilly-sur-Seine, Courbevoie et Suresnes — prolongent agréablement la balade.',
          },
          {
            heading: 'Meilleur moment pour les photos',
            body: 'Le matin tôt et la tombée de la nuit offrent la lumière la plus douce, et la façade de marbre blanc scintille au coucher du soleil. En semaine, la fréquentation est plus calme, idéal pour des clichés nets de la géométrie et de l’esplanade.',
          },
          {
            heading: 'Durée et conseils pratiques',
            body: 'Comptez 30 à 60 minutes pour l’extérieur et l’esplanade, et une demi-journée si vous ajoutez la visite du cluster d’architecture moderne. Prévoyez des chaussures confortables ; les toilettes publiques et la plupart des commodités se trouvent dans le centre commercial voisin.',
          },
        ],
        faq: [
          {
            q: 'Faut-il un billet pour visiter la Grande Arche ?',
            a: 'Non. L’extérieur, l’esplanade de La Défense et la place publique se visitent gratuitement. Le toit étant fermé depuis avril 2023, il n’y a aucun billet « sommet » à acheter.',
          },
          {
            q: 'Peut-on entrer dans la Grande Arche ?',
            a: 'Les deux ailes abritent des bureaux et ne sont pas ouvertes au public ; les visiteurs admirent l’édifice depuis la place extérieure et le cadre central évidé, qui encadre l’Arc de Triomphe et les Champs-Élysées le long de l’axe historique.',
          },
          {
            q: 'Peut-on monter en haut de la Grande Arche ?',
            a: 'Non. Le sommet (Le Toit) est fermé au public depuis avril 2023, et aucune visite « au sommet » n’est proposée. La visite se fait au niveau du sol et depuis l’esplanade.',
          },
          {
            q: 'Combien de temps faut-il prévoir pour la visite ?',
            a: 'L’extérieur et l’esplanade demandent environ 30 à 60 minutes ; comptez une demi-journée si vous ajoutez la visite du cluster d’architecture moderne de La Défense.',
          },
          {
            q: 'Le toit va-t-il rouvrir ?',
            a: 'Aucune réouverture du toit n’est annoncée sur les canaux officiels. Renseignez-vous auprès de la mairie de Puteaux ou du département des Hauts-de-Seine pour toute évolution.',
          },
        ],
      },
      es: {
        title: 'Visitar La Grande Arche de la Défense',
        metaTitle: 'Visitar La Grande Arche de la Défense: acceso gratuito, explanada y consejos',
        metaDescription: 'Cómo visitar La Grande Arche de la Défense gratis: exterior y explanada de acceso libre, terraza cerrada desde 2023. Acceso desde París, qué ver, mejor momento para las fotos y duración de la visita.',
        intro: 'La Grande Arche de la Défense es un cubo hueco de mármol blanco de 110 metros, en el corazón del distrito de negocios de La Défense, al oeste de París, sobre el eje histórico que une el Louvre con el Arco de Triunfo. Su visita es gratuita —no hace falta billete ni reserva— y se puede admirar esta obra maestra de la arquitectura moderna desde el exterior y en la explanada que la rodea, a cualquier hora y en cualquier estación.',
        sections: [
          {
            heading: 'Localización y acceso',
            body: 'La Arche se sitúa en Puteaux (Hauts-de-Seine), 1 Parvis de la Défense, 92800, al oeste de París. Lo más sencillo es el metro línea 1 o el RER A hasta La Défense – Grande Arche; al salir, se llega al monumento a pie cruzando la explanada, en pocos minutos.',
          },
          {
            heading: 'Qué se puede ver gratis',
            body: 'El exterior del monumento, la explanada de La Défense y la plaza pública se visitan libremente. Desde el marco hueco, mira hacia el este: la ventana blanca enmarca el eje histórico de 12 km —el Arco de Triunfo, los Campos Elíseos y el Louvre alineados en un mismo encuadre.',
          },
          {
            heading: 'La terraza (Le Toit) está cerrada desde 2023',
            body: 'La terraza (Le Toit) está cerrada al público de forma permanente desde abril de 2023. No hay visitas de pago, ni exposiciones, ni acceso a la cima: no planees tu visita en torno a una subida, y centra la visita en el nivel del suelo.',
          },
          {
            heading: 'La explanada y el clúster de arquitectura moderna',
            body: 'Alrededor de la Arche, la explanada permite llegar a pie al CNIT y al centro comercial Westfield Les Quatre Temps, así como a las torres emblemáticas de La Défense. Las comunas vecinas —Puteaux, Neuilly-sur-Seine, Courbevoie y Suresnes— prolongan agradablemente el paseo.',
          },
          {
            heading: 'Mejor momento para las fotos',
            body: 'Las primeras horas de la mañana y el anochecer ofrecen la luz más suave, y la fachada de mármol blanco brilla al atardecer. Entre semana la afluencia es más tranquila, ideal para fotos nítidas de la geometría y de la explanada.',
          },
          {
            heading: 'Duración y consejos prácticos',
            body: 'Cuenta de 30 a 60 minutos para el exterior y la explanada, y media jornada si añades la visita del clúster de arquitectura moderna. Lleva calzado cómodo; los aseos públicos y la mayoría de servicios se encuentran en el centro comercial vecino.',
          },
        ],
        faq: [
          {
            q: '¿Hace falta billete para visitar La Grande Arche?',
            a: 'No. El exterior, la explanada de La Défense y la plaza pública se visitan gratis. Como la terraza está cerrada desde abril de 2023, no hay ningún billete de cima que comprar.',
          },
          {
            q: '¿Se puede entrar en La Grande Arche?',
            a: 'Las dos alas albergan oficinas y no están abiertas al público; los visitantes admiran el edificio desde la plaza exterior y el marco central hueco, que enmarca el Arco de Triunfo y los Campos Elíseos a lo largo del eje histórico.',
          },
          {
            q: '¿Se puede subir a la cima de La Grande Arche?',
            a: 'No. La cima (Le Toit) está cerrada al público desde abril de 2023, y no se ofrece ninguna visita a la cima. La visita se hace a nivel del suelo y desde la explanada.',
          },
          {
            q: '¿Cuánto tiempo conviene prever para la visita?',
            a: 'El exterior y la explanada requieren unos 30 a 60 minutos; cuenta media jornada si añades la visita del clúster de arquitectura moderna de La Défense.',
          },
          {
            q: '¿Volverá a abrir la terraza?',
            a: 'Ninguna reapertura de la terraza está anunciada en los canales oficiales. Infórmate en el ayuntamiento de Puteaux o en el departamento de Hauts-de-Seine para cualquier novedad.',
          },
        ],
      },
    },
  },
  {
    key: 'rooftop-closed',
    slugs: {
      zh: 'rooftop-closed',
      en: 'rooftop-closed',
      fr: 'toit-grande-arche-ferme',
      es: 'terraza-grande-arche-cerrada',
    },
    content: {
      zh: {
        title: '屋顶观景台是否已关闭？',
        metaTitle: '拉德芳斯大拱门屋顶关闭：开放状态、门票与历史',
        metaDescription:
          '拉德芳斯大拱门屋顶观景台（Le Toit）自 2023 年 4 月起永久关闭，不再售票。了解关闭原因、历史与现在能参观的区域。',
        intro:
          '是的，拉德芳斯大拱门（La Grande Arche de la Défense）的屋顶观景台（Le Toit）已经关闭。自 2023 年 4 月起，顶部不再对公众开放，也没有任何登顶门票或展览可供购买。',
        sections: [
          {
            heading: '关闭时间与现状',
            body: '屋顶平台于 2023 年 4 月永久关闭，停止一切面向游客的登顶参观与展览。这一状态在法国上塞纳省旅游目的地网站与多家法国旅游信息源中均有说明。',
          },
          {
            heading: '为什么没有门票可买',
            body: '因为顶部不再对公众开放，官方渠道不出售任何“观景台门票”。任何声称可在线购买大拱门登顶票的信息都不可信，请以免误导。',
          },
          {
            heading: '现在能参观什么',
            body: '纪念碑外观、拉德芳斯广场与公共空间仍免费开放，可自由欣赏建筑与历史轴线景观。把行程放在地面，而非登顶。',
          },
          {
            heading: '一段简史',
            body: '大拱门由丹麦建筑师约翰·奥托·冯·斯普雷克森设计，1989 年 7 月 14 日法国大革命 200 周年之际揭幕。屋顶平台曾作为观景与展览空间运营，如今已关闭。',
          },
        ],
        faq: [
          {
            q: '屋顶观景台什么时候关闭的？',
            a: '自 2023 年 4 月起，拉德芳斯大拱门屋顶平台（Le Toit）已对公众永久关闭。',
          },
          {
            q: '还能买到登顶门票吗？',
            a: '不能。顶部不再开放，官方不出售任何观景台或登顶门票。请勿通过第三方购买所谓“登顶票”。',
          },
          {
            q: '关闭后还值得去吗？',
            a: '值得。建筑外观、广场与历史轴线景观完全免费，且是拉德芳斯现代建筑群的核心。建议安排地面参观与拍照。',
          },
        ],
      },
      en: {
        title: 'Is the rooftop observation deck closed?',
        metaTitle:
          'Grande Arche rooftop closed: status, tickets & history',
        metaDescription:
          'The Grande Arche de la Défense rooftop (Le Toit) has been permanently closed since April 2023 and no tickets are sold. Why it closed, its history and what you can still visit.',
        intro:
          'Yes — the rooftop terrace of the Grande Arche de la Défense (La Grande Arche), known as Le Toit, is closed. Since April 2023 the top has been permanently closed to the public, and there are no summit tickets or exhibitions to buy.',
        sections: [
          {
            heading: 'When and what changed',
            body: 'The rooftop was permanently closed in April 2023, ending all public “summit” visits and exhibitions. This status is confirmed by the Hauts-de-Seine tourism board and several French visitor-information sources.',
          },
          {
            heading: 'Why there is no ticket to buy',
            body: 'Because the top is no longer open to the public, official channels do not sell any “observation-deck” ticket. Any listing offering to buy a Grande Arche summit ticket online is not legitimate — do not rely on it.',
          },
          {
            heading: 'What you can still visit',
            body: 'The monument’s exterior, the La Défense esplanade and the public plaza remain free to explore, with views of the historic axis. Plan a ground-level visit rather than a climb.',
          },
          {
            heading: 'A short history',
            body: 'Designed by Danish architect Johan Otto von Spreckelsen, the Arche was inaugurated on 14 July 1989 for the bicentenary of the French Revolution. The rooftop later operated as a panorama and exhibition space before closing.',
          },
        ],
        faq: [
          {
            q: 'When did the rooftop close?',
            a: 'The rooftop terrace (Le Toit) of the Grande Arche de la Défense has been permanently closed to the public since April 2023.',
          },
          {
            q: 'Can I still buy a summit ticket?',
            a: 'No. The top is no longer open and official sources sell no rooftop or summit ticket. Avoid third-party “summit ticket” offers.',
          },
          {
            q: 'Is it still worth visiting after closure?',
            a: 'Yes. The exterior, the esplanade and the historic-axis views are completely free and form the centrepiece of the La Défense architecture cluster. Plan a ground-level walk and photo stop.',
          },
        ],
      },
      fr: {
        title: 'Le toit de la Grande Arche est-il fermé ?',
        metaTitle:
          'Toit de la Grande Arche fermé : état actuel, billets, depuis quand et histoire',
        metaDescription:
          'Le toit de la Grande Arche de la Défense (Le Toit) est fermé de façon permanente depuis avril 2023 : aucun billet sommet, aucune exposition. Depuis quand, pourquoi, et ce qu’on peut encore visiter gratuitement.',
        intro:
          'Oui — la terrasse du toit de la Grande Arche de la Défense (La Grande Arche), appelée Le Toit, est fermée. Depuis avril 2023, le sommet est fermé au public de façon permanente, et il n’y a ni billet « sommet » ni exposition à acheter. La bonne nouvelle : l’extérieur et l’esplanade restent totalement libres d’accès.',
        sections: [
          {
            heading: 'Depuis quand et qu’a-t-il changé',
            body: 'Le toit a été fermé de façon permanente en avril 2023, mettant fin aux visites « sommet » et aux expositions. Cette situation est confirmée par le conseil départemental des Hauts-de-Seine et plusieurs sources touristiques françaises.',
          },
          {
            heading: 'Pourquoi le toit est-il fermé ?',
            body: 'L’accès au sommet n’est plus ouvert au public et aucune réouverture n’est annoncée officiellement. Méfiez-vous des annonces tierces qui proposent un « billet sommet » : elles ne correspondent à aucun canal officiel.',
          },
          {
            heading: 'Y a-t-il un billet à acheter ?',
            body: 'Non. Le sommet n’étant plus ouvert au public, les canaux officiels ne vendent aucun billet de « belvédère » ou « sommet ». Toute offre en ligne de ce type n’est pas officielle : ne vous y fiez pas.',
          },
          {
            heading: 'Ce qu’on peut encore visiter gratuitement',
            body: 'L’extérieur du monument, l’esplanade de La Défense et la place publique restent libres d’accès, avec les vues sur l’axe historique. Privilégiez une visite au niveau du sol plutôt qu’une montée.',
          },
          {
            heading: 'Un peu d’histoire du monument et du toit',
            body: 'Conçue par l’architecte danois Johan Otto von Spreckelsen, l’Arche a été inaugurée le 14 juillet 1989 pour le bicentenaire de la Révolution française. Le toit a ensuite accueilli un belvédère et un espace d’exposition avant sa fermeture.',
          },
          {
            heading: 'Ce qu’il faut retenir de la fermeture',
            body: 'La fermeture du toit ne change rien à la visite de l’esplanade ni à la vue depuis le sol. Combinez simplement votre passage avec la découverte de l’architecture moderne de La Défense, à quelques minutes à pied.',
          },
        ],
        faq: [
          {
            q: 'Quand le toit a-t-il fermé ?',
            a: 'La terrasse du toit (Le Toit) de la Grande Arche de la Défense est fermée au public de façon permanente depuis avril 2023.',
          },
          {
            q: 'Le toit va-t-il rouvrir ?',
            a: 'Aucune réouverture n’est annoncée sur les canaux officiels. Consultez la mairie de Puteaux ou le département des Hauts-de-Seine pour toute information actualisée.',
          },
          {
            q: 'Puis-je encore acheter un billet « sommet » ?',
            a: 'Non. Le sommet n’est plus ouvert et les sources officielles ne vendent aucun billet de toit ou « sommet ». Évitez les offres tierces de « billet sommet ».',
          },
          {
            q: 'Y a-t-il une vue depuis le sol ?',
            a: 'Oui. Depuis l’esplanade et le cadre central évidé, on devine l’alignement de l’axe historique (Arc de Triomphe, Champs-Élysées, Louvre). C’est gratuit et accessible à toute heure.',
          },
          {
            q: 'Vaut-il encore la peine de venir depuis la fermeture ?',
            a: 'Oui. L’extérieur, l’esplanade et les vues sur l’axe historique sont totalement gratuits et forment le cœur du cluster d’architecture de La Défense. Prévoyez une visite au sol et une pause photo.',
          },
        ],
      },
      es: {
        title: '¿Está cerrada la terraza de La Grande Arche?',
        metaTitle: 'Terraza de La Grande Arche cerrada: estado actual, billetes, desde cuándo e historia',
        metaDescription: 'La terraza de La Grande Arche de la Défense (Le Toit) está cerrada de forma permanente desde abril de 2023: ningún billete de cima, ninguna exposición. Desde cuándo, por qué, y qué se puede visitar gratis.',
        intro: 'Sí —la terraza de La Grande Arche de la Défense (La Grande Arche), llamada Le Toit, está cerrada. Desde abril de 2023 la cima está cerrada al público de forma permanente, y no hay ni billete de cima ni exposición que comprar. La buena noticia: el exterior y la explanada siguen siendo totalmente de acceso libre.',
        sections: [
          {
            heading: 'Desde cuándo y qué ha cambiado',
            body: 'La terraza se cerró de forma permanente en abril de 2023, poniendo fin a las visitas a la cima y a las exposiciones. Esta situación está confirmada por el consejo departamental de Hauts-de-Seine y varias fuentes turísticas francesas.',
          },
          {
            heading: '¿Por qué está cerrada la terraza?',
            body: 'El acceso a la cima ya no está abierto al público y ninguna reapertura está anunciada oficialmente. Desconfía de los anuncios de terceros que proponen un billete de cima: no corresponden a ningún canal oficial.',
          },
          {
            heading: '¿Hay billete que comprar?',
            body: 'No. Como la cima ya no está abierta al público, los canales oficiales no venden ningún billete de mirador ni de cima. Cualquier oferta en línea de este tipo no es oficial: no te fíes.',
          },
          {
            heading: 'Qué se puede visitar gratis',
            body: 'El exterior del monumento, la explanada de La Défense y la plaza pública siguen de acceso libre, con las vistas sobre el eje histórico. Privilegia una visita a nivel del suelo antes que una subida.',
          },
          {
            heading: 'Un poco de historia del monumento y de la terraza',
            body: 'Diseñada por el arquitecto danés Johan Otto von Spreckelsen, la Arche fue inaugurada el 14 de julio de 1989 por el bicentenario de la Revolución francesa. La terraza acogió más tarde un mirador y un espacio de exposición antes de su cierre.',
          },
          {
            heading: 'Qué retener del cierre',
            body: 'El cierre de la terraza no cambia nada en la visita de la explanada ni en la vista desde el suelo. Simplemente combina tu paso con el descubrimiento de la arquitectura moderna de La Défense, a pocos minutos a pie.',
          },
        ],
        faq: [
          {
            q: '¿Cuándo se cerró la terraza?',
            a: 'La terraza (Le Toit) de La Grande Arche de la Défense está cerrada al público de forma permanente desde abril de 2023.',
          },
          {
            q: '¿Volverá a abrir la terraza?',
            a: 'Ninguna reapertura está anunciada en los canales oficiales. Consulta el ayuntamiento de Puteaux o el departamento de Hauts-de-Seine para información actualizada.',
          },
          {
            q: '¿Puedo comprar un billete de cima?',
            a: 'No. La cima ya no está abierta y las fuentes oficiales no venden ningún billete de terraza ni de cima. Evita las ofertas de terceros de billete de cima.',
          },
          {
            q: '¿Hay vista desde el suelo?',
            a: 'Sí. Desde la explanada y el marco central hueco se adivina la alineación del eje histórico (Arco de Triunfo, Campos Elíseos, Louvre). Es gratis y accesible a cualquier hora.',
          },
          {
            q: '¿Merece la pena venir tras el cierre?',
            a: 'Sí. El exterior, la explanada y las vistas sobre el eje histórico son totalmente gratuitos y forman el corazón del clúster de arquitectura de La Défense. Prevé una visita al nivel del suelo y una pausa para fotos.',
          },
        ],
      },
    },
  },
  {
    key: 'getting-there',
    slugs: {
      zh: 'getting-there',
      en: 'how-to-get-there',
      fr: 'comment-aller-grande-arche',
      es: 'como-llegar-grande-arche',
    },
    content: {
      zh: {
        title: '如何前往拉德芳斯大拱门',
        metaTitle: '前往拉德芳斯大拱门：地铁、RER 与交通路线',
        metaDescription:
          '怎么去拉德芳斯大拱门？地铁 1 号线或 RER A 至 La Défense – Grande Arche 最方便；本文说明从机场、市中心与圣母院的交通方式。',
        intro:
          '拉德芳斯大拱门位于巴黎西郊，交通十分便利。最推荐的方式是公共交通：地铁 1 号线或 RER A 线直达 La Défense – Grande Arche 站，出站即达拉德芳斯广场。',
        sections: [
          {
            heading: '从巴黎市中心',
            body: '在凯旋门站搭乘地铁 1 号线，于 La Défense – Grande Arche 站下车，车程约 10 分钟。这是最便捷的选择，出站穿过广场步行数分钟即到大拱门脚下。',
          },
          {
            heading: '从戴高乐机场（CDG）',
            body: '搭乘 RER B 线至 Châtelet-Les Halles，换乘 RER A 线至 La Défense，全程约 60 分钟。也可乘 Roissybus 或出租车，但公共交通更经济。',
          },
          {
            heading: '从巴黎圣母院',
            body: '乘地铁 4 号线至 Châtelet，换乘 1 号线至 La Défense – Grande Arche，全程约 30 分钟。',
          },
          {
            heading: '自驾与停车',
            body: '拉德芳斯区有多个地下停车场，但车位紧张且费用较高。为方便与环保，建议优先选择公共交通前往。',
          },
        ],
        faq: [
          {
            q: '坐地铁怎么去大拱门？',
            a: '乘地铁 1 号线（或 RER A 线）至 La Défense – Grande Arche 站，出站穿过拉德芳斯广场步行即达，从凯旋门出发约 10 分钟。',
          },
          {
            q: '从戴高乐机场要多久？',
            a: '搭乘 RER B 转 RER A 至 La Défense，全程约 60 分钟。',
          },
          {
            q: '有停车场吗？',
            a: '拉德芳斯区有地下停车场，但建议公共交通前往，更方便也更环保。',
          },
        ],
      },
      en: {
        title: 'How to get to the Grande Arche de la Défense',
        metaTitle:
          'Getting to the Grande Arche de la Défense: metro, RER & routes',
        metaDescription:
          'How to reach the Grande Arche de la Défense: Métro line 1 or RER A to La Défense – Grande Arche is easiest. Routes from the airport, city centre and Notre-Dame.',
        intro:
          'The Grande Arche de la Défense sits on the western edge of Paris with excellent transport links. Public transport is best: Métro line 1 or RER A to La Défense – Grande Arche drops you right at the esplanade.',
        sections: [
          {
            heading: 'From central Paris',
            body: 'Take Métro line 1 from Charles de Gaulle – Étoile (Arc de Triomphe) to La Défense – Grande Arche, about 10 minutes. It is the most convenient option; a short walk across the esplanade brings you to the foot of the Arche.',
          },
          {
            heading: 'From Charles de Gaulle Airport (CDG)',
            body: 'Take RER B to Châtelet-Les Halles, then change to RER A to La Défense — about 60 minutes total. Roissybus or a taxi also work, but public transport is cheaper.',
          },
          {
            heading: 'From Notre-Dame Cathedral',
            body: 'Take Métro line 4 to Châtelet, then line 1 to La Défense – Grande Arche, about 30 minutes in total.',
          },
          {
            heading: 'Driving & parking',
            body: 'La Défense has several underground car parks, but spaces are tight and priced. For convenience and the environment, public transport is recommended.',
          },
        ],
        faq: [
          {
            q: 'How do I get to the Arche by metro?',
            a: 'Take Métro line 1 (or RER A) to La Défense – Grande Arche; a short walk across the esplanade reaches the Arche. From the Arc de Triomphe it is about 10 minutes.',
          },
          {
            q: 'How long from Charles de Gaulle Airport?',
            a: 'RER B to RER A to La Défense takes about 60 minutes.',
          },
          {
            q: 'Is there parking?',
            a: 'La Défense has underground car parks, but public transport is recommended for convenience and to reduce impact.',
          },
        ],
      },
      fr: {
        title: 'Comment aller à la Grande Arche de la Défense',
        metaTitle:
          'Comment aller à la Grande Arche de la Défense : métro, RER, depuis l’aéroport et le centre de Paris',
        metaDescription:
          'Comment rejoindre la Grande Arche de la Défense : métro ligne 1 ou RER A jusqu’à La Défense – Grande Arche. Itinéraires depuis l’aéroport Charles-de-Gaulle, le centre de Paris, Notre-Dame et en voiture.',
        intro:
          'La Grande Arche de la Défense se trouve à l’ouest de Paris et est très bien desservie par les transports en commun. Le plus simple est le métro ligne 1 ou le RER A jusqu’à La Défense – Grande Arche, qui vous déposent sur l’esplanade, à quelques minutes à pied du monument.',
        sections: [
          {
            heading: 'Depuis le centre de Paris (Arc de Triomphe)',
            body: 'Prenez le métro ligne 1 depuis Charles-de-Gaulle – Étoile (Arc de Triomphe) jusqu’à La Défense – Grande Arche, environ 10 minutes. C’est l’option la plus commode ; une courte marche à travers l’esplanade mène au pied de l’Arche.',
          },
          {
            heading: 'Depuis l’aéroport Charles-de-Gaulle (CDG)',
            body: 'Prenez le RER B jusqu’à Châtelet-Les Halles, puis le RER A jusqu’à La Défense — environ 60 minutes au total. Le Roissybus ou un taxi sont possibles, mais le transport en commun est moins coûteux.',
          },
          {
            heading: 'Depuis l’aéroport d’Orly (ORY)',
            body: 'Empruntez OrlyVal jusqu’à Antony, puis le RER B jusqu’à Châtelet-Les Halles et le RER A jusqu’à La Défense — comptez 70 à 80 minutes. L’Orlybus + le métro sont une alternative.',
          },
          {
            heading: 'Depuis la cathédrale Notre-Dame',
            body: 'Prenez le métro ligne 4 jusqu’à Châtelet, puis la ligne 1 jusqu’à La Défense – Grande Arche, environ 30 minutes au total. La correspondance à Châtelet est bien signalée.',
          },
          {
            heading: 'Métro, RER, tram et bus',
            body: 'La station La Défense – Grande Arche combine le métro ligne 1, le RER A, le tramway T2 et plusieurs lignes de bus RATP. La gare est grande mais clairement fléchée vers l’esplanade et le monument.',
          },
          {
            heading: 'En voiture et stationnement',
            body: 'La Défense dispose de plusieurs parkings souterrains (dont celui du Westfield Les Quatre Temps), mais les places sont rares et payantes. Pour la commodité et l’environnement, privilégiez les transports en commun.',
          },
        ],
        faq: [
          {
            q: 'Comment aller à l’Arche en métro ?',
            a: 'Prenez le métro ligne 1 (ou le RER A) jusqu’à La Défense – Grande Arche ; une courte marche à travers l’esplanade rejoint l’Arche. Depuis l’Arc de Triomphe, comptez environ 10 minutes.',
          },
          {
            q: 'Combien de temps depuis l’aéroport Charles-de-Gaulle ?',
            a: 'RER B puis RER A jusqu’à La Défense : environ 60 minutes. Prévoyez un peu plus aux heures de pointe.',
          },
          {
            q: 'Depuis Orly, comment faire ?',
            a: 'OrlyVal + RER B jusqu’à Châtelet-Les Halles, puis RER A jusqu’à La Défense ; comptez 70 à 80 minutes au total.',
          },
          {
            q: 'Quelle est la gare la plus proche ?',
            a: 'La station La Défense – Grande Arche (RER A, métro ligne 1, tramway T2) est la plus proche ; l’Arche est à quelques minutes à pied par l’esplanade.',
          },
          {
            q: 'Y a-t-il un parking ?',
            a: 'Oui, plusieurs parkings souterrains dont celui du Westfield Les Quatre Temps. Les transports en commun restent recommandés pour la commodité et l’impact réduit.',
          },
        ],
      },
      es: {
        title: 'Cómo llegar a La Grande Arche de la Défense',
        metaTitle: 'Cómo llegar a La Grande Arche de la Défense: metro, RER, desde el aeropuerto y el centro de París',
        metaDescription: 'Cómo llegar a La Grande Arche de la Défense: metro línea 1 o RER A hasta La Défense – Grande Arche. Rutas desde el aeropuerto Charles-de-Gaulle, el centro de París, Notre-Dame y en coche.',
        intro: 'La Grande Arche de la Défense se encuentra al oeste de París y está muy bien comunicada por transporte público. Lo más sencillo es el metro línea 1 o el RER A hasta La Défense – Grande Arche, que te dejan en la explanada, a pocos minutos a pie del monumento.',
        sections: [
          {
            heading: 'Desde el centro de París (Arco de Triunfo)',
            body: 'Toma el metro línea 1 desde Charles-de-Gaulle – Étoile (Arco de Triunfo) hasta La Défense – Grande Arche, unos 10 minutos. Es la opción más cómoda; una corta caminata a través de la explanada lleva a los pies de la Arche.',
          },
          {
            heading: 'Desde el aeropuerto Charles-de-Gaulle (CDG)',
            body: 'Toma el RER B hasta Châtelet-Les Halles y luego el RER A hasta La Défense —unos 60 minutos en total. El Roissybus o un taxi también son posibles, pero el transporte público es más económico.',
          },
          {
            heading: 'Desde el aeropuerto de Orly (ORY)',
            body: 'Toma OrlyVal hasta Antony, luego el RER B hasta Châtelet-Les Halles y el RER A hasta La Défense —cuenta de 70 a 80 minutos. El Orlybus + metro son una alternativa.',
          },
          {
            heading: 'Desde la catedral de Notre-Dame',
            body: 'Toma el metro línea 4 hasta Châtelet y luego la línea 1 hasta La Défense – Grande Arche, unos 30 minutos en total. El transbordo en Châtelet está bien señalizado.',
          },
          {
            heading: 'Metro, RER, tranvía y autobús',
            body: 'La estación La Défense – Grande Arche combina el metro línea 1, el RER A, el tranvía T2 y varias líneas de autobús RATP. La estación es grande pero está claramente señalizada hacia la explanada y el monumento.',
          },
          {
            heading: 'En coche y aparcamiento',
            body: 'La Défense dispone de varios aparcamientos subterráneos (incluido el de Westfield Les Quatre Temps), pero las plazas son escasas y de pago. Por comodidad y por el entorno, privilegia el transporte público.',
          },
        ],
        faq: [
          {
            q: '¿Cómo llegar a la Arche en metro?',
            a: 'Toma el metro línea 1 (o el RER A) hasta La Défense – Grande Arche; una corta caminata a través de la explanada te acerca a la Arche. Desde el Arco de Triunfo, cuenta unos 10 minutos.',
          },
          {
            q: '¿Cuánto se tarda desde el aeropuerto Charles-de-Gaulle?',
            a: 'RER B y luego RER A hasta La Défense: unos 60 minutos. Prevé un poco más en horas punta.',
          },
          {
            q: 'Desde Orly, ¿cómo se hace?',
            a: 'OrlyVal + RER B hasta Châtelet-Les Halles, luego RER A hasta La Défense; cuenta de 70 a 80 minutos en total.',
          },
          {
            q: '¿Cuál es la estación más cercana?',
            a: 'La estación La Défense – Grande Arche (RER A, metro línea 1, tranvía T2) es la más cercana; la Arche está a pocos minutos a pie por la explanada.',
          },
          {
            q: '¿Hay aparcamiento?',
            a: 'Sí, varios aparcamientos subterráneos, incluido el de Westfield Les Quatre Temps. El transporte público sigue siendo recomendable por comodidad y menor impacto.',
          },
        ],
      },
    },
  },
];

const BASE_URL = 'https://www.grandearcheparis.com';

// Reverse lookup: slug -> { topic, locale }
const SLUG_INDEX: Record<string, { topic: Topic; locale: Locale }> = {};
for (const topic of TOPICS) {
  for (const locale of Object.keys(topic.slugs) as Locale[]) {
    SLUG_INDEX[topic.slugs[locale]] = { topic, locale };
  }
}

export function topicPath(locale: Locale, key: TopicKey): string {
  const topic = TOPICS.find((t) => t.key === key);
  if (!topic) return `/${locale}`;
  return `/${locale}/${topic.slugs[locale]}`;
}

export function resolveTopic(
  locale: string,
  slug: string,
): { topic: Topic; locale: Locale } | null {
  const hit = SLUG_INDEX[slug];
  if (!hit) return null;
  if (hit.locale !== locale) return null;
  return hit;
}

export function topicHreflangUrls(key: TopicKey): Record<string, string> {
  const topic = TOPICS.find((t) => t.key === key)!;
  return {
    zh: `${BASE_URL}/zh/${topic.slugs.zh}`,
    en: `${BASE_URL}/en/${topic.slugs.en}`,
    fr: `${BASE_URL}/fr/${topic.slugs.fr}`,
    es: `${BASE_URL}/es/${topic.slugs.es}`,
    'x-default': `${BASE_URL}/fr/${topic.slugs.fr}`,
  };
}
