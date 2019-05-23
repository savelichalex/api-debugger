import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { remote } from 'electron';
import * as Babel from '@babel/standalone';
import * as fs from 'fs';

export class App extends React.Component {
		componentDidMount() {
				remote.dialog.showOpenDialog(
						{
								properties: ['openFile'],
						},
					fileName => {
							fs.readFile(fileName[0], { encoding: 'utf8' }, (err, data) => {
								if (err) {
									console.error("Can't read the file");
								}

								try {
									eval(Babel.transform(data, {
										presets: ['typescript'],
										filename: 'foo.ts',
									}).code);
								} catch (ex) {
									console.error('ERROR: ' + ex.message);
								}
							})
						}
				);
		}

		render() {
				const val = `
const getMessage = (): void => console.log('Hello World');
getMessage();
				`
				return (
						<div>
								<span>Hello you!</span>
						</div>
				);
	}

	static run() {
		ReactDOM.render(<App />, document.getElementById('application'));
	}
}

App.run();
