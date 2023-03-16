
import Utils from './utils.js'
class PromptFactory {


    static recapHistory(history) {
        if (history.length === 0) {
            return "You just got their attention to start the conversation.\n"
        }
        let summary = "Recently in the conversation, the two of you have said:\n"
        for (const entry of history) {
            let speaker, dialogue;
            [speaker, dialogue] = entry;
            summary = summary + `${speaker}: ${dialogue}\n`;
        }
        return summary;
    }


    static speakerPromptFlirt(speaker, listener, history, state, characterData) {

        let speaker_gendered_descriptor = state[speaker].self.is_man ? "man" : "woman";
        let listener_gendered_descriptor = state[listener].self.is_man ? "man" : "woman";
        let good_traits = characterData[listener].goodTraits;
        let bad_traits = characterData[listener].goodTraits;

        let summary = PromptFactory.recapHistory(history)

        return `You are ${speaker}, a 20-something contestant on a dramatic reality TV dating show.
You are a ${speaker_gendered_descriptor} looking for the love of your life and television fame.
Your think of yourself as ${good_traits[0]} and ${good_traits[1]}, but those who've gotten on your bad side might describe you as ${bad_traits[0]} and ${bad_traits[1]}

Right now, you are flirting with ${listener}, a 20-something ${listener_gendered_descriptor}, to see if you have a connection.

${summary}
What do you say next? Keep response to at most 2 sentences.
${Utils.capitalize(speaker)}: `

    }

}

export default PromptFactory;