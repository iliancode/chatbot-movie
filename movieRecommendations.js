
//dans le cas ou la clée api saute, si y aun de ces mot on renvoie des films par défaut
function getMovieRecommendations(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('romantic') || msg.includes('romance') || msg.includes('love') || msg.includes('romantique') || msg.includes('amour')) {
        return "Voici d'excellents films romantiques :\n\n1. **La Princesse Mariée** - Romance de conte de fées classique avec de l'aventure\n2. **Casablanca** - Drame romantique intemporel de la Seconde Guerre mondiale\n3. **Quand Harry rencontre Sally** - Comédie romantique pleine d'esprit sur l'amitié et l'amour\n4. **N'oublie jamais** - Histoire d'amour émouvante qui s'étend sur des décennies\n5. **La La Land** - Romance musicale moderne à Los Angeles";
    }
    
    if (msg.includes('sci-fi') || msg.includes('science fiction') || msg.includes('space') || msg.includes('matrix') || msg.includes('science-fiction') || msg.includes('espace')) {
        return "Voici d'excellents films de science-fiction :\n\n1. **Blade Runner 2049** - Suite visuellement époustouflante de science-fiction\n2. **Interstellar** - Aventure spatiale épique sur l'amour et le temps\n3. **Matrix** - Classique cyberpunk qui bouleverse l'esprit\n4. **Premier Contact** - Film de contact extraterrestre réfléchi\n5. **Dune** - Opéra spatial épique avec des visuels incroyables";
    }
    
    if (msg.includes('horror') || msg.includes('scary') || msg.includes('frightening') || msg.includes('horreur') || msg.includes('peur') || msg.includes('effrayant')) {
        return "Voici d'excellents films d'horreur :\n\n1. **Hérédité** - Chef-d'œuvre d'horreur psychologique\n2. **Get Out** - Thriller social avec des éléments d'horreur\n3. **Conjuring** - Horreur surnaturelle classique\n4. **Sans un bruit** - Thriller d'horreur silencieux innovant\n5. **Midsommar** - Horreur folk troublante en plein jour";
    }
    
    if (msg.includes('action') || msg.includes('john wick') || msg.includes('fighting') || msg.includes('combat')) {
        return "Voici des films d'action palpitants :\n\n1. **John Wick** - Action stylée avec une chorégraphie incroyable\n2. **Mad Max: Fury Road** - Action post-apocalyptique non-stop\n3. **The Raid** - Film d'action d'arts martiaux intense\n4. **Mission: Impossible - Fallout** - Action d'espionnage à gros enjeux\n5. **Baby Driver** - Action avec une bande sonore incroyable";
    }
    
    if (msg.includes('comedy') || msg.includes('funny') || msg.includes('laugh') || msg.includes('comédie') || msg.includes('drôle') || msg.includes('rire')) {
        return "Voici des comédies hilarantes :\n\n1. **The Grand Budapest Hotel** - Comédie fantaisiste de Wes Anderson\n2. **Superbad** - Comédie classique de passage à l'âge adulte\n3. **À couteaux tirés** - Comédie mystère avec un excellent casting\n4. **Parasite** - Thriller comédie noire (avec sous-titres)\n5. **Hunt for the Wilderpeople** - Comédie touchante de Nouvelle-Zélande";
    }
    
    if (msg.includes('thriller') || msg.includes('suspense') || msg.includes('mystery') || msg.includes('mystère')) {
        return "Voici des thrillers captivants :\n\n1. **Zodiac** - Enquête méticuleuse sur un tueur en série\n2. **Gone Girl** - Thriller psychologique sur le mariage\n3. **Prisoners** - Thriller intense sur des personnes disparues\n4. **Shutter Island** - Thriller psychologique qui bouleverse l'esprit\n5. **No Country for Old Men** - Chef-d'œuvre thriller des frères Coen";
    }
    
    if (msg.includes('family') || msg.includes('kids') || msg.includes('children') || msg.includes('famille') || msg.includes('enfants')) {
        return "Voici d'excellents films familiaux :\n\n1. **Coco** - Magnifique film Pixar sur la famille et la musique\n2. **Les Indestructibles** - Aventure de famille de super-héros\n3. **Le Voyage de Chihiro** - Film d'animation magique du Studio Ghibli\n4. **Paddington** - Comédie charmante animation/prise de vue réelle\n5. **Vaiana** - Aventure musicale Disney sur la découverte de soi";
    }
    
    // Default recommendations
    return "Voici des films universellement acclamés :\n\n1. **Les Évadés** - Drame puissant sur l'espoir et l'amitié\n2. **Les Affranchis** - Chef-d'œuvre criminel de Martin Scorsese\n3. **Pulp Fiction** - Récit non linéaire iconique de Tarantino\n4. **The Dark Knight** - Épopée Batman de Christopher Nolan\n5. **Forrest Gump** - Histoire touchante qui s'étend sur des décennies\n\nDites-moi quel genre vous préférez pour des recommandations plus spécifiques !";
}

module.exports = { getMovieRecommendations };
