export const buildComparePrompt = ({ systemA, systemB, focus = 'production architecture' }) => `You are a principal system architect. Compare ${systemA} and ${systemB} for ${focus}. Distinguish documented/common industry patterns from reasonable inference. Return ONLY valid JSON:
{
 "summary":"string",
 "systems":{"left":{"name":"${systemA}","architecture":"string","database":["string"],"caching":["string"],"storage":["string"],"scaling":["string"],"messageQueue":["string"],"cdn":["string"],"security":["string"],"pros":["string"],"cons":["string"]},"right":{"name":"${systemB}","architecture":"string","database":["string"],"caching":["string"],"storage":["string"],"scaling":["string"],"messageQueue":["string"],"cdn":["string"],"security":["string"],"pros":["string"],"cons":["string"]}},
 "keyDifferences":[{"dimension":"string","${systemA}":"string","${systemB}":"string","verdict":"string"}],
 "interviewTakeaways":["string"]
}`;
