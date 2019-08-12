# AR-game
  [Backend](https://github.com/DangerN/AR-game-backend)
  This is a simple augmented reality game which utilizes a single sheet of A4 paper and a smartphone(preferably newish.)
  If you do not already have markers, please print out [this](https://github.com/DangerN/AR-game/blob/master/docs/AR-game%20peices.pdf) .pdf and cut along the dotted lines.

  You can play the game [here](https://dangern.github.io/AR-game/)

## How to play
1. The goal is to get all five markers to display a blue cube.
2. Markers advance stage based on their position relative to other markers. Stage is represented by color. The stages are:
    * **White** - Initial color.
    * **Green** - Achieved by bringing one marker close to another.
    * **Red** - Achieved by separating markers.
    * **Blue** - Achieved by one marker close to two others.
3. Only players who are logged in may submit scores.
4. A player may log in or sign up under the authentication tab.
5. Scores are registered in milliseconds.
6. *Time begins the moment the page loads.*
## Dev Notes
### Top Issues
* **A-Frame Size** - Some devices experience issues with meshes being offset from their markers, as well as large portions of the viewport being outside of the window.
* **Mobile Menu Scale** - The menu overlay is difficult to read and make selections in on mobile devices. Also button styling is overwritten on mobile.
* **Menu Clarity** - User signup option is not clear enough, nor is the necessity for being logged in to submit scores.
* **Vague Stage Advancement** - Game stage advancement conditions are lacking in consistency. Random arrangements of markers seems to be as effective as logical arrangements.
* **Marker Tracking** - Players moving markers can cause tracking issues which in turn causes erratic advancement behavior.

## Contributing

  AR-game is a pretty weak name. If you have a better one, please submit a pull request with your suggestion **HERE**
