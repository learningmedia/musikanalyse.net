<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true"
    CodeFile="T3.aspx.cs" Inherits="ExamplesFunction_T3" Title="Die Tonika mit Terz im Bass" %>

<asp:Content ID="Content1" ContentPlaceHolderID="headPlaceHolder" runat="Server">
    <style type="text/css">
        .complexDefinition
        {
            padding: 20px 0 20px 0;
        }
        .complexDefinition2
        {
            padding: 20px 0 0 0;
        }
        .diagramm
        {
            text-align: center;
        }
        .kursiv
        {
            font-style: italic;
        }
        .line
        {
            margin: 20px auto 0 auto;
            width: 200px;
            height: 1px;
            color: Gray;
        }
        .colorBold
        {
            color: #B90E1D;
            font-weight: bold;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="bodyPlaceHolder" runat="Server">
    <div class="defaultContainer">
        <h2>
            Beispiele zur Tonika mit Terz im Bass:</h2>
        <p class="complexDefinition">
            Das folgende Beispiel enthält vier tonikale Sextakkorde:
        </p>
        <p class="diagramm">
            <img alt="Notenabbildung 1 zum tonikalen Sextakkord" src="images/T3.png" alt="Beispiel Sextakkorde" />
        </p>
        <hr class="line" />
        <p class="diagramm">
            <object type="application/x-shockwave-flash" data="../../../sound/emff_stuttgart.swf"
                width="140" height="30">
                <param name="movie" value="../sound/emff_stuttgart.swf" />
                <param name="FlashVars" value="src=sound/#.mp3" />
            </object>
        </p>
        <p class="complexDefinition">
            Es zeigt drei typische »Funktionen« tonikaler Sextakkorde: Sextakkorde erklingen
            häufig als instabile bzw. vorläufige Auflösung eines dominantischen Akkords (wie
            der erste Sextakkord des Beispiels), bilden zusammen mit der Subdominante eine Wechselharmonik
            (zweite und dritte Sextakkord des Beispiels) oder signalisieren den Beginn einer
            Kadenz (letzter Sextakkord des Beispiels, in Kompositionen ist dieser häufig mit
            Terzverdopplung anzutreffen).<br />
            In der folgenden Abbildung aus der Sonate in G-Dur KV 283 von Wolfgang Amadeus Mozart
            ist eine Kadenz in D-Dur zu sehen. In ihr erklingt ein tonikaler Sextakkord als
            Auflösung eines dominantischen A-Dur-Akkords und gleichzeitig als Anfang des Kadenzvollzugs:
            <p class="diagramm">
                <img src="Images/T3_Mozart283.png" alt="Notenabbildung 2 zum tonikalen Sextakkord" />
            </p>
            <hr class="line" />
            <p class="diagramm">
                <object type="application/x-shockwave-flash" data="../../../sound/emff_stuttgart.swf"
                    width="140" height="30">
                    <param name="movie" value="../sound/emff_stuttgart.swf" />
                    <param name="FlashVars" value="src=sound/#.mp3" />
                </object>
            </p>
            <p class="complexDefinition">
                Das nächste Beispiel entstammt einer Gavotte aus dem Notenbuch von Johann Georg
                Alt (um 1761). Es zeigt ein typisches Übungsstück für Klavier aus Salzburg um 1760,
                nach denen auch <a href="http://de.wikipedia.org/wiki/Mozart">Wolfgang Amadeus Mozart</a>
                im Alter von 5 Jahren das Klavierspielen und Komponieren gelernt hat. In den vier
                Takten ist eine Pendelharmonik und Kadenz in G-Dur zu sehen, wobei drei tonikale
                Sextakkord zwei Subdominanten umschließen. Der letzte Tonika-Sextakkord bildet gleichzeitig
                den Beginn der Kadenz:</p>
            <p class="diagramm">
                <img src="images/T3_NbAlt.png" alt="Notenabbildung 3 zum tonikalen Sextakkord" />
            </p>
            <hr class="line" />
            <p class="diagramm">
                <object type="application/x-shockwave-flash" data="../../../sound/emff_stuttgart.swf" width="140"
                    height="30">
                    <param name="movie" value="../sound/emff_stuttgart.swf" />
                    <param name="FlashVars" value="src=sound/#.mp3" />
                </object>
            </p>
            <p>
                <a href="../../Funktionstheorie.aspx" class="smallAnchor">Zurück</a></p>
    </div>
</asp:Content>
