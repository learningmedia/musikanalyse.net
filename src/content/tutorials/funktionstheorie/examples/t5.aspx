<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true"
    CodeFile="T5.aspx.cs" Inherits="ExamplesFunction_T5" Title="Die Tonika mit Quinte im Bass" %>

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
            Beispiele zur Tonika mit Quinte im Bass:</h2>
        <p class="complexDefinition">
            Das folgende Beispiel in F-Dur enthält drei tonikale Akkorde, wobei nur dem letzten
            tonikalen Akkord aufgrund der vorhergehenden <a href="http://www.musiktheorie-aktuell.de/tutorials/kadenz.aspx">
                Kadenz</a>, der Oktavlage (= Oktave zwischen Sopran und Bass) und der tiefen
            Basslage eine Schlusswirkung zukommt:
        </p>
        <p class="diagramm">
            <img src="Images/T5_Beispiel-1.png" alt="Beispiel 1 zum tonikalen Quartsextakkord" />
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
            Wenn Sprünge im Bass vermieden werden sollen, besteht die Möglichkeit, den Bass
            durch Verwendung eines subdominantischen Sextakkords und einen tonikalen Quartsextakkord
            linear zu gestalten:
        </p>
        <p class="diagramm">
            <img src="Images/T5_Beispiel-2.png" alt="Beispiel 2 zum tonikalen Quartsextakkord" />
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
            Der Quartsextklang, der im Beispiel oben als tonikaler Quartsextakkord bezeichnet
            worden ist, gleicht vom Aussehen her einem dominantischen Akkord (C) mit Doppelvorhalt
            (a zu g und f zu e, <a href="#">Vorhalts-Quartsextakkord</a>). Dass dieser Quartsextklang
            auch als dominantischer Vorhalts-Quartsextakkord interpretiert werden kann, verdeutlicht
            das nächste Beispiel. Es unterscheidet sich vom vorherigen nur durch den dominantischen
            Beginn, doch liegt es hier nahe, die Quartsextakkorde als dominantisch zu interpretieren:
        </p>
        <p class="diagramm">
            <img src="Images/T5_Beispiel-3.png" alt="Beispiel 3 zum tonikalen Quartsextakkord" />
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
            Denn der Dominantton (c) wird umspielt (d-c-b-c), wobei zu den Umspielungstöne d
            und b subdominantische Akkorde erklingen. Gegen diese Interpretation würde zwar
            die metrisch leichte Zeit (die zweite Zählzeit im 4/4-Takt) der Quartsextakkorde
            sprechen, da Vorhalte im Allgemeinen und der Vorhalts-Quartsextakkord im Besonderen
            üblicher Weise auf schwerer Taktzeit erklingen. Für diese Interpretation sprechen
            allerdings Literaturbeispiele wie z.B. eine Stelle aus der Arie »Saepe terrent Numina«
            des lateinischen Intermediums »Apollo et Hyazinthus« KV&nbsp;38 von Wolfgang Amadeus
            Mozart, wo der oben gezeigte Bass mit einem eindeutigen dominantischen Quartvorhalt
            anstelle des Quartsextakkords erklingt (Original in B-Dur):
        </p>
        <p class="diagramm">
            <img src="Images/T5_Beispiel-5.png" alt="Beispiel 4 zum tonikalen Quartsextakkord" />
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
            Ob tonikaler Quartsextakkord oder dominantischer Vorhalts-Quartsextakkord: An einem
            einzelnen Akkord lässt sich diese Frage leider nicht sinnvoll entscheiden. Ob man
            einen Quartsextakkord, der von zwei subdominantischen Klängen eingerahmt wird, als
            Dominante oder Tonika interpretiert, lässt sich nur über das Hören bestimmen.<br />
            Das letzte Beispiel zeigt einen zweimaligen Anlauf zu einer <a href="http://www.musiktheorie-aktuell.de/tutorials/kadenz.aspx">
                Kadenz</a>. Beide Anläufe beginnen mit einem <a href="T3.aspx">tonikalen Sextakkord</a>
            und zwischen den Subdominanten im dritten Takt erklingt ein tonikaler Quartsextakkord
            (bzw. dominantischer Vorhalts-Quartsextakkord). Lassen sich diese Quartsextakkorde
            noch auf verschiedene Weise interpretieren, ist die Funktion der Quartsextakkorde
            im vorletzten Takt des Beispiels eindeutig bestimmbar: Hier handelt es sich um dominantische
            <a href="#">Vorhalts-Quartsextakkorde</a>:
        </p>
        <p class="diagramm">
            <img src="Images/T5_Beispiel-41.png" alt="Beispiel 4 zum tonikalen Quartsextakkord" />
        </p>
        <p class="diagramm">
            <img src="Images/T5_Beispiel-42.png" alt="Beispiel 5 zum tonikalen Quartsextakkord" />
        </p>
        <p>
            <img src="Images/T5_Beispiel-43.png" style="margin-left: 75px;" alt="Beispiel 6 zum tonikalen Quartsextakkord" />
        </p>
        <p class="complexDefinition">
            Das letzte Beispiel entstammt der Sonate in C-Dur KV 14, 1. Satz, T. 23-30 von W.
            A. Mozart. Der Einfacheit halber wurde nur die Klavierstimme (ohne Violin- und Violoncellostimme)
            abgebildet.<br />
            <br />
            <a href="../../Funktionstheorie.aspx" class="smallAnchor">Zurück</a>
        </p>
    </div>
</asp:Content>
