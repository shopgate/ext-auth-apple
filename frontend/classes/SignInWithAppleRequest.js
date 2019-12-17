import { event, logger } from '@shopgate/engage/core';
import AppCommand from '@shopgate/pwa-core/classes/AppCommand';

const LIB_VERSION = '24.0';

/**
 * Basic class for SignInWithApple related commands.
 *
 * Maintains the request command and waits for a response to resolve a promise returned by
 * `.dispatch`.
 */
class SignInWithAppleRequest {
  /**
   * Constructor.
   * @param {string} commandName Command name.
   * @param {string} eventName Event name.
   * @param {Array} queue Command name.
   */
  constructor(commandName, eventName, queue) {
    this.commandName = commandName;
    this.eventName = eventName;
    this.queue = queue;
    this.commandParams = null;
    event.addCallback(this.eventName, this.handleResponse);
  }

  /**
   * Handles responses
   * @param {Object|null} error The error object if an error happened.
   * @param {Object} response Response.
   */
  handleResponse = (error, response) => {
    const queueEntry = this.queue.shift();
    if (typeof queueEntry === 'undefined') {
      logger.error(`${this.commandName} received but the response handler queue is empty.`);
      return;
    }

    const { resolve, reject } = queueEntry;

    if (error) {
      reject(error);
    } else {
      resolve(response);
    }
  }

  /**
   * Sets the command params.
   * @param {Object} [params=null] The command params.
   * @return {SignInWithAppleRequest}
   */
  setCommandParams(params) {
    this.commandParams = params;
    return this;
  }

  /**
   * Dispatches the request.
   * @returns {Promise}
   */
  dispatch() {
    return new Promise(async (resolve, reject) => {
      this.queue.push({
        resolve,
        reject,
      });

      // Prepare the AppCommand.
      const command = new AppCommand()
        .setCommandName(this.commandName)
        .setLibVersion(LIB_VERSION);

      // Dispatch the command. The method will resolve with FALSE in case of an error.
      const result = await command.dispatch(this.commandParams);

      if (result === false) {
        // Remove the queue entry when the dispatch failed.
        this.queue.pop();
        reject(new Error(`${this.commandName} command dispatch failed`));
      }
    });
  }
}

export default SignInWithAppleRequest;
