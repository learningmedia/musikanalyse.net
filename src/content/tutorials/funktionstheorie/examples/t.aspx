<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true"
    CodeFile="T.aspx.cs" Inherits="ExamplesFunction_T" Title="Die Tonika mit Grundton im Bass" %>

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
            Beispiele zur Tonika mit Grundton im Bass:</h2>
        <p class="complexDefinition">
            Das folgende Beispiel enthält drei Akkorde mit tonikaler Funktion:
        </p>
        <p class="diagramm">
            <img alt="Notenbeispiel zur Tonika" src="images/t.png" />
        </p>
        <hr class="line" />
        <p class="diagramm">
            <object type="application/x-shockwave-flash" data="../../../sound/emff_stuttgart.swf" width="140"
                height="30">
                <param name="movie" value="../sound/emff_stuttgart.swf" />
                <param name="FlashVars" value="src=regola/sound/01_scheibeRegolaDur.mp3" />
            </object>
        </p>
        <p class="complexDefinition">
            Die drei Tonika-Akkorde sind allerdings nicht gleichwertig bzw. übernehmen in dem
            Beispiel oben verschiedene »Funktionen«: Der erste Tonika-Akkord ist aufgrund der
            Terzlage (= Terz zwischen Sopran und Bass) nicht so stabil wie der letzte. Der mittlere
            Tonika-Akkord weist zwar wie der letzte eine stabile Oktavlage auf (= Oktave zwischen
            Sopran und Bass), dafür erklingt der Bass für einen gewichtigen Schluss in einer
            zu hohen Lage.<br />
            Funktionszeichen können zwar chiffrieren, dass einem bestimmten Akkord eine tonikale
            Funktion zukommt. Wie solche tonikalen Akkorde allerdings in einer konkreten Komposition
            wirken, also ob sie z.B. eine öffnende, schließende oder transitorische bzw. durchgehende
            »Funktion« haben, darüber geben Funktionszeichen in ihrer gebräuchlichen Ausprägung
            keine Auskunft.<br />
            <br />
            <a href="../../Funktionstheorie.aspx" class="smallAnchor">Zurück</a>
        </p>
    </div>
</asp:Content>
