import Simulation from "./simulation.js"
import UIManager from "./ui_manager.js"

class Game {
    constructor() {
        this.simulation = new Simulation(
            () => this.updateCharacters(),
            (name, action, description) => this.logAction(name, action, description),
            (name, text) => this.logConversation(name, text),
            (initiator, recipient, conversationActive) => this.setConversationActive(initiator, recipient, conversationActive),
            (locked) => this.setLocked(locked),
        )
        this.ui = new UIManager(() => this.step());
        document.getElementById("setKey").onclick = () => this.onKeySet();
    }

    onKeySet() {
        key = document.getElementById("keyfield").value
        this.simulation.openAI.setKey(key);
        console.log("KEY SET");
    }

    async initialize() {
        return this.simulation.initialize()
            .then(function () {
                this.ui.addCharacters(
                    this.simulation.getCharacters(),
                    this.simulation.characterBios,
                    this.simulation.getState()
                );
            }.bind(this));
    }

    step() {
        if (this.locked) {
            console.log("locked!")
        } else {
            this.setLocked(true)
            this.simulation.step()
        }
    }

    updateCharacters() {
        let state = this.simulation.getState();
        this.ui.updateCharacters(state);
    }

    logAction(name, action, description) {
        this.ui.logAction(name, action, description);
    }

    logConversation(name, text) {
        this.ui.logConversation(name, text);
    }

    setConversationActive(initiator, recipient, conversationActive) {
        this.ui.setConversationActive(initiator, recipient, conversationActive);
    }

    setLocked(locked) {
        this.locked = locked;
        this.ui.lockStepButton(locked);
    }

}

export default Game;