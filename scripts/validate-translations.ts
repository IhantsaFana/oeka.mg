/**
 * Script de validation des fichiers de traduction
 * Vérifie que tous les fichiers JSON sont valides et contiennent les mêmes clés
 */

import fs from 'fs';
import path from 'path';

const LOCALES_DIR = path.join(process.cwd(), 'public', 'locales');
const LANGUAGES = ['en', 'fr', 'mg', 'es', 'zh', 'de'];

interface TranslationKeys {
    [key: string]: string | TranslationKeys;
}

/**
 * Récupère toutes les clés d'un objet de traduction de manière récursive
 */
function getKeys(obj: TranslationKeys, prefix = ''): string[] {
    let keys: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            keys = keys.concat(getKeys(value as TranslationKeys, fullKey));
        } else {
            keys.push(fullKey);
        }
    }

    return keys.sort();
}

/**
 * Charge un fichier de traduction
 */
function loadTranslation(lang: string): TranslationKeys | null {
    const filePath = path.join(LOCALES_DIR, lang, 'translation.json');

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`❌ Erreur lors du chargement de ${lang}:`, error);
        return null;
    }
}

/**
 * Valide tous les fichiers de traduction
 */
function validateTranslations() {
    console.log('🔍 Validation des fichiers de traduction...\n');

    const translations: Record<string, TranslationKeys> = {};
    const allKeys: Record<string, string[]> = {};

    // Charge toutes les traductions
    for (const lang of LANGUAGES) {
        const translation = loadTranslation(lang);

        if (!translation) {
            console.error(`❌ Impossible de charger la traduction pour ${lang}`);
            process.exit(1);
        }

        translations[lang] = translation;
        allKeys[lang] = getKeys(translation);

        console.log(`✅ ${lang.toUpperCase()}: ${allKeys[lang].length} clés chargées`);
    }

    console.log('\n📊 Analyse des clés...\n');

    // Utilise l'anglais comme référence
    const referenceKeys = allKeys['en'];
    let hasErrors = false;

    // Compare chaque langue avec la référence
    for (const lang of LANGUAGES) {
        if (lang === 'en') continue;

        const langKeys = allKeys[lang];
        const missingKeys = referenceKeys.filter(key => !langKeys.includes(key));
        const extraKeys = langKeys.filter(key => !referenceKeys.includes(key));

        if (missingKeys.length > 0 || extraKeys.length > 0) {
            hasErrors = true;
            console.log(`⚠️  ${lang.toUpperCase()}:`);

            if (missingKeys.length > 0) {
                console.log(`   Clés manquantes (${missingKeys.length}):`);
                missingKeys.slice(0, 5).forEach(key => console.log(`     - ${key}`));
                if (missingKeys.length > 5) {
                    console.log(`     ... et ${missingKeys.length - 5} autres`);
                }
            }

            if (extraKeys.length > 0) {
                console.log(`   Clés en trop (${extraKeys.length}):`);
                extraKeys.slice(0, 5).forEach(key => console.log(`     - ${key}`));
                if (extraKeys.length > 5) {
                    console.log(`     ... et ${extraKeys.length - 5} autres`);
                }
            }

            console.log('');
        } else {
            console.log(`✅ ${lang.toUpperCase()}: Toutes les clés sont présentes`);
        }
    }

    console.log('\n' + '='.repeat(50));

    if (hasErrors) {
        console.log('⚠️  Certaines traductions ont des clés manquantes ou en trop');
        console.log('   Veuillez vérifier et corriger les fichiers concernés.');
    } else {
        console.log('✅ Toutes les traductions sont complètes et cohérentes!');
        console.log(`📝 ${referenceKeys.length} clés validées pour ${LANGUAGES.length} langues`);
    }

    console.log('='.repeat(50) + '\n');

    return !hasErrors;
}

// Exécute la validation
const isValid = validateTranslations();
process.exit(isValid ? 0 : 1);
