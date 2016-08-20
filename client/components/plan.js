import React, { Component } from 'react';

export default class Plan extends Component {
  render() {
    return (

    <svg width="800" height="260">
     <g transform="scale(1.25)">

      <rect
        className="room" id="Dijkstra"
        onClick={()=>alert('Dijkstra')}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        stroke="#7f7f7f" transform="rotate(-45.16584777832031 158.7763671875,46.063694000244155) "  height="26.86994" width="16.533696" y="32.628725" x="150.509514" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null"
        fillOpacity={this.props.window === "Dijkstra" ? "1" : ".25"}
        fill="#8AD4EB"/>

      <path
        className="room" id="Death Star"
        onClick={()=>alert('Death Star')}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        stroke="#7f7f7f" transform="rotate(-89.98080444335938 28.26541519165043,156.59671020507815) " d="m1.942203,183.14199l0,-53.090559l52.646424,53.090559l-52.646424,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null"
        fillOpacity={this.props.window === "Death Star" ? "1" : ".25"}
        fill="#b266cc"/>

      <path stroke="#7f7f7f" transform="rotate(134.31851196289062 56.4438591003418,156.76611328125) "  d="m36.749135,176.419003l0,-39.305785l39.38945,39.305785l-39.38945,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null"
      fill="white"/>

      <path className="room" id="Naboo"
        onClick={()=>alert('Naboo')}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        stroke="#7f7f7f" transform="rotate(134.31851196289062 56.4438591003418,156.76611328125) "  d="m36.749135,176.419003l0,-39.305785l39.38945,39.305785l-39.38945,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null"
        fillOpacity={this.props.window === "Naboo" ? "1" : ".25"}
        fill="#B296C7"/>


      <path
        className="room" id="Tatooine"
        onClick={()=>alert("Tatooine")}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        stroke="#7f7f7f" d="m548.620592,181.792932l0,-50.993266l51.009373,50.993266l-51.009373,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null"
        fillOpacity={this.props.window === "Tatooine" ? "1" : ".25"}
        fill="#9FE966"/>

      <path stroke="#7c7c7c" transform="rotate(134.83108520507812 545.2105712890625,156.4084625244141) "  d="m524.67226,176.838057l0,-40.859182l41.076643,40.859182l-41.076643,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null"
      fill="white"/>

      <path
        className="room" id="Dagobah"
        onClick={()=>alert("Dagobah")}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        stroke="#7c7c7c" transform="rotate(134.83108520507812 545.2105712890625,156.4084625244141) "  d="m524.67226,176.838057l0,-40.859182l41.076643,40.859182l-41.076643,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null"
        fillOpacity={this.props.window === "Dagobah" ? "1" : ".25"}
        fill="#3599B8"/>


      <rect
        className="room" id="Ellis"
        onClick={()=>alert("Ellis")}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        height="27.586207" width="34.827586" y="12.452437" x="215.852995" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7f7f7f"
        fillOpacity={this.props.window === "Ellis" ? "1" : ".25"}
        fill="#FD625E"/>

      <rect
        className="room" id="Lecture Hall"
        onClick={()=>alert('Lecture Hall')}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        height="41.37931" width="46.551724" y="80.862069" x="201.551724" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7f7f7f"
        fillOpacity={this.props.window === "Lecture Hall" ? "1" : ".25"}
        fill="#FFA500"/>

      <rect
        className="room" id="Hopper"
        onClick={()=>alert("Hopper")}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        stroke="#7f7f7f" height="27.794137" width="17.2979" y="12.241379" x="182.227552" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null"
        fillOpacity={this.props.window === "Hopper" ? "1" : ".25"}
        fill="#F2C80F"/>

      <rect
        className="room" id="Lovelace"
        onClick={()=>alert('Lovelace')}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        stroke="#7f7f7f" height="27.759489" width="16.08448" y="12.283406" x="199.787557" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null"
        fillOpacity={this.props.window === "Lovelace" ? "1" : ".25"}
        fill="#0066cc"/>

      <path
        className="room" id="Turing"
        onClick={()=>alert('Turing')}
        onMouseEnter={ (e)=> this.props.updateWindow(e.target.id) }
        stroke="#7c7c7c" transform="rotate(45.09850311279297 182.18260192871094,30.97190475463868) "  d="m162.891259,50.058811l0,-38.173809l38.582686,38.173809l-38.582686,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null"
        fillOpacity={this.props.window === "Turing" ? "1" : ".25"}
        fill="#01B8AA"/>

      <line id="svg_15" y2="107.634206" x2="314.148217" y1="125.887607" x1="314.327172" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0.5" stroke="#7f7f7f" fill="none"/>
      <line id="svg_14" y2="107.554098" x2="401.10869" y1="132.469923" x1="401.10869" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f7f" fill="none"/>
      <path id="svg_277" d="m268.433763,166.6475l33.749997,-33.749997l33.749997,33.749997l-33.749997,33.749997l-33.749997,-33.749997z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="#b2b2b2"/>
      <rect stroke="none" transform="rotate(45.33577346801758 446.2554626464844,172.20556640625) " id="svg_248" height="23.576087" width="25.829978" y="160.417532" x="433.340474" strokeOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#e5e5e5"/>
      <rect stroke="none" strokeOpacity="0" id="svg_246" height="23.584906" width="30.09434" y="132.264151" x="401.320755" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <path stroke="#e5e5e5" transform="rotate(-134.98715209960938 422.94638061523443,30.727275848388697) " id="svg_241" d="m406.1491,47.981294l0,-34.508035l33.594571,34.508035l-33.594571,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <rect stroke="#7f7f7f" id="svg_230" height="27.599999" width="36.05" y="11.88795" x="386.65" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <rect id="svg_174" transform="rotate(43.58755111694336 319.51614379882795,140.12902832031253) " height="9.935484" width="11.806452" y="135.161285" x="313.612904" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <rect id="svg_175" transform="rotate(43.58755111694336 319.50000000000006,140.0749816894531) " height="9.935484" width="11.806452" y="135.107234" x="313.596775" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7f7f7f" fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="429.73684" y1="12.36842" x2="599.504819" y2="181.614358" id="svg_16"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="190.26316" y1="157.10526" x2="164.47368" y2="182.89474" id="svg_18"/>
      <line stroke="#7f7f7f" fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="216.005286" y1="12.58621" x2="257.41379" y2="12.24138" id="svg_21"/>
      <line fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="278.10345" y1="12.24138" x2="326.37931" y2="12.24138" id="svg_22" stroke="#7f7f7f"/>
      <line fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="346.37931" y1="11.89655" x2="394.31035" y2="11.89655" id="svg_23" stroke="#7f7f7f"/>
      <path id="svg_110" stroke="#7f7f00" transform="rotate(0.5998340249061584 182.50001525879026,144.5833282470698) " d="m169.361366,144.583326l5.63085,-11.93099l15.01559,0l5.63084,11.93099l-5.63084,11.93099l-15.01559,0l-5.63085,-11.93099z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="none"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="190.353569" y1="156.922788" x2="257.594949" y2="156.922788" id="svg_24"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="345.34483" y1="155.68966" x2="413.27586" y2="156.03448" id="svg_25"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="438.7931" y1="182.24138" x2="599.13793" y2="181.55172" id="svg_26"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="413.27586" y1="156.37931" x2="439.13793" y2="182.24138" id="svg_27"/>
      <line fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="257.75862" y1="156.72414" x2="283.62069" y2="181.89655" id="svg_28" stroke="#7f7f7f"/>
      <line fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="320.51724" y1="181.89655" x2="345.68966" y2="156.03448" id="svg_29" stroke="#7f7f7f"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="257.41379" y1="12.24138" x2="264.31034" y2="19.48276" id="svg_33"/>
      <line fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="277.75862" y1="12.24138" x2="271.2069" y2="19.48276" id="svg_34" stroke="#7f7f7f"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="413.96552" y1="11.89655" x2="430.51724" y2="12.24138" id="svg_35"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="332.93103" y1="19.13793" x2="326.37931" y2="12.58621" id="svg_36"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="339.13793" y1="19.48276" x2="346.72414" y2="11.89655" id="svg_37"/>
      <line stroke="#7f7f7f" fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="401.925303" y1="19.668178" x2="394.31034" y2="11.89655" id="svg_38"/>
      <line stroke="#7f7f7f" fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="408.079348" y1="19.579169" x2="414.980549" y2="12.000358" id="svg_39"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="263.96552" y1="19.48276" x2="271.55172" y2="19.48276" id="svg_41"/>
      <line fill="none" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="332.93103" y1="19.48276" x2="339.13793" y2="19.48276" id="svg_42" stroke="#7f7f7f"/>
      <line fill="none" stroke="#7f7f7f" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x1="401.55172" y1="19.48276" x2="408.44828" y2="19.48276" id="svg_43"/>
      <rect stroke="#7c7c7c" id="svg_9" height="21.034482" width="16.896552" y="101.150749" x="201.599934" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <rect stroke="#7f7f7f" id="svg_11" height="27.586207" width="33.103451" y="11.896552" x="353.620688" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <line id="svg_12" y2="39.482759" x2="369.827586" y1="12.241379" x1="369.827586" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7f7f7f" fill="none"/>
      <line id="svg_44" y2="39.482759" x2="404.655172" y1="19.482759" x1="404.655172" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7f7f7f" fill="none"/>
      <rect stroke="#7f7f7f" id="svg_47" height="17.894735" width="93.112711" y="163.947369" x="455.526316" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <rect stroke="#7f7f7f" id="svg_48" height="23.684211" width="30.828904" y="132.146445" x="370.263158" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <rect stroke="#7c7c7c" transform="rotate(45.08393859863281 429.3298645019531,155.22816467285153) " id="svg_49" height="24.2617" width="21.726152" y="143.097314" x="418.466791" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <line id="svg_71" y2="164.694918" x2="455.928494" y1="154.694918" x1="445.928494" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f7f" fill="none"/>
      <line stroke="#7f7f7f" id="svg_76" y2="132.071142" x2="423.472299" y1="132.152764" x1="401.312049" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line stroke="#7f7f7f" id="svg_77" y2="139.86876" x2="431.155532" y1="131.926254" x1="423.109779" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect stroke="#7c7c7c" id="svg_79" height="18.007704" width="101.531144" y="164.593956" x="54.980946" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <path stroke="#7f7f00" transform="rotate(-13.18289852142334 141.11828613281236,114.62172698974614) " id="svg_105" d="m127.97964,114.621723l5.630847,-11.930991l15.01559,0l5.630845,11.930991l-5.630845,11.930991l-15.01559,0l-5.630847,-11.930991z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="none"/>
      <path id="svg_107" stroke="#7f7f00" transform="rotate(-13.18289852142334 123.86856842041016,131.0667724609375) " d="m110.729914,131.066763l5.63085,-11.93099l15.01559,0l5.63084,11.93099l-5.63084,11.93099l-15.01559,0l-5.63085,-11.93099z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="none"/>
      <path id="svg_108" stroke="#7f7f00" transform="rotate(-13.18289852142334 106.77538299560533,147.48190307617182) " d="m93.636725,147.481881l5.63085,-11.93099l15.01559,0l5.63084,11.93099l-5.63084,11.93099l-15.01559,0l-5.63085,-11.93099z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="none"/>
      <path id="svg_109" stroke="#7f7f00" transform="rotate(-13.18289852142334 145.36233520507818,143.85871887207034) " d="m132.223683,143.858694l5.63085,-11.93099l15.01559,0l5.63084,11.93099l-5.63084,11.93099l-15.01559,0l-5.63085,-11.93099z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="none"/>
      <rect stroke="#7c7c7c" transform="rotate(135.3951416015625 109.44656372070311,95.24100494384766) " id="svg_87" height="26.690927" width="122.686462" y="81.895537" x="48.103337" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#e5e5e5"/>
      <line id="svg_88" y2="123.636985" x2="99.172428" y1="105.139072" x1="80.674515" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_89" y2="109.867861" x2="113.219715" y1="91.091784" x1="94.304556" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_90" y2="98.045887" x2="125.7371" y1="79.26981" x1="106.126531" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_91" y2="73.567445" x2="150.215542" y1="55.486778" x1="130.744054" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <path stroke="#7f7f00" transform="rotate(29.47571563720703 422.0409545898437,99.16107177734366) " id="svg_203" d="m409.250349,99.161065l5.481693,-11.078061l14.617848,0l5.481692,11.078061l-5.481692,11.078061l-14.617848,0l-5.481693,-11.078061z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <path id="svg_204" stroke="#7f7f00" transform="rotate(15.30609130859375 461.20690917968744,112.06896209716807) " d="m448.416297,112.068958l5.48169,-11.07806l14.61785,0l5.48169,11.07806l-5.48169,11.07807l-14.61785,0l-5.48169,-11.07807z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <path id="svg_205" stroke="#7f7f00" transform="rotate(15.30609130859375 477.7586059570312,128.27586364746097) " d="m464.967997,128.275857l5.48169,-11.07806l14.61785,0l5.48169,11.07806l-5.48169,11.07807l-14.61785,0l-5.48169,-11.07807z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <path id="svg_206" stroke="#7f7f00" transform="rotate(15.30609130859375 494.3103332519527,144.82759094238284) " d="m481.519727,144.82758l5.48169,-11.07806l14.61785,0l5.48169,11.07806l-5.48169,11.07807l-14.61785,0l-5.48169,-11.07807z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect stroke="#7c7c7c" transform="rotate(-44.874080657958984 486.7093505859375,88.29214477539061) " id="svg_92" height="137.516759" width="26.382248" y="19.533764" x="473.518207" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#e5e5e5"/>
      <line stroke="#7c7c7c" id="svg_93" y2="43.046154" x2="422.692312" y1="39.769231" x1="422.692305" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_94" y2="42.692308" x2="422.538462" y1="49.153846" x1="429" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_95" y2="43" x2="459.769231" y1="61" x1="441.153846" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_96" y2="54.846154" x2="472.076923" y1="73.153846" x1="453" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_97" y2="78.846154" x2="495.769231" y1="97.307692" x1="476.538462" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_98" y2="91.153846" x2="508.076923" y1="109.461538" x1="489.461538" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_99" y2="103.307692" x2="519.923077" y1="121.615385" x1="501.153846" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <rect id="svg_112" height="24.637681" width="42.753622" y="132.173906" x="199.166642" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="#e5e5e5"/>
      <line id="svg_113" y2="156.811586" x2="222.717367" y1="132.536224" x1="222.717367" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <rect stroke="#7c7c7c" fillOpacity="0" id="svg_114" height="26.658458" width="24.816037" y="81.400398" x="382.779397" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect id="svg_115" height="26.717558" width="19.465649" y="81.335881" x="363.320626" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <rect stroke="#7c7c7c" id="svg_116" height="20.481655" width="10.298467" y="87.50185" x="372.339638" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect stroke="#7c7c7c" id="svg_117" height="13.358779" width="15.188678" y="94.69466" x="348.053449" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_118" y2="108.096774" x2="348.548387" y1="108.225806" x1="314.548387" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_119" y2="108.354839" x2="314.806452" y1="102.935484" x1="308.741935" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_120" y2="103.645163" x2="308.935484" y1="93.59355" x1="308.935484" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_122" y2="80.437903" x2="314.674194" y1="80.373387" x1="325.319355" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_123" y2="88.096774" x2="333" y1="88.290323" x1="319.967742" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_124" y2="88.612903" x2="332.870968" y1="79.580645" x1="332.870968" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_125" y2="80.032258" x2="332.548387" y1="79.903226" x1="340.354839" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_126" y2="79.387097" x2="340.677419" y1="88.741935" x1="340.741935" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_127" y2="94.741935" x2="348.032258" y1="86.032258" x1="348.096774" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_128" y2="85.903226" x2="348.032258" y1="85.967742" x1="348.032258" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_129" y2="88.290323" x2="347.967742" y1="88.225806" x1="340.870968" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_130" y2="81.967742" x2="345.193548" y1="81.967742" x1="340.870968" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_132" y2="81.322581" x2="344.548369" y1="81.322581" x1="363.451645" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect stroke="#7c7c7c" id="svg_133" height="4.753226" width="5.100806" y="95.387097" x="321.824194" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_134" y2="95.193548" x2="321.83871" y1="88.677419" x1="321.83871" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_135" y2="95.322581" x2="326.935484" y1="91.322581" x1="326.935484" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_136" y2="91.451613" x2="326.419356" y1="91.580645" x1="347.645161" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect stroke="#7c7c7c" id="svg_137" height="20.600001" width="8.965517" y="87.423448" x="248.103448" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect id="svg_138" height="6.551724" width="11.724138" y="80.862069" x="248.448276" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <path stroke="#7c7c7c" transform="rotate(23.150066375732422 311.59591674804693,87.22516632080078) " id="svg_141" d="m308.379421,87.225169l3.216483,-6.773609l3.216483,6.773609l-3.216483,6.773609l-3.216483,-6.773609z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <path stroke="#7c7c7c" transform="rotate(-21.873126983642578 293.4107971191406,86.96942138671874) " id="svg_143" d="m290.394124,86.969423l3.016667,-6.465671l3.016667,6.465671l-3.016667,6.465671l-3.016667,-6.465671z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_145" y2="92.5" x2="295.8" y1="103.433333" x1="295.966667" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_146" y2="102.989854" x2="296.154021" y1="108.119285" x1="290.605875" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_149" y2="107.977538" x2="290.96264" y1="108.103705" x1="257.452673" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <rect id="svg_150" height="4.482759" width="4.482759" y="95.589655" x="278.303448" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_151" y2="91.55" x2="278.2" y1="91.6" x1="257.5" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_152" y2="88.4" x2="285.4" y1="88.4" x1="271.9" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_153" y2="88.25" x2="282.75" y1="95.15" x1="282.8" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_154" y2="91.1" x2="278.25" y1="95.1" x1="278.3" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_155" y2="88.85" x2="264.95" y1="79.95" x1="264.95" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_156" y2="80.3" x2="264.45" y1="80.35" x1="272.15" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_157" y2="79.9" x2="272.45" y1="88.65" x1="272.4" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_159" y2="82.2" x2="264.8" y1="82.25" x1="260.2" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_160" y2="88.35" x2="265.199999" y1="88.35" x1="259.799999" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_161" y2="156.724138" x2="258.103448" y1="151.896552" x1="258.103448" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_162" y2="152.242516" x2="257.954857" y1="126.724138" x1="284.310345" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_163" y2="126.8" x2="284" y1="126.65" x1="290.5" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_164" y2="126.55" x2="290.15" y1="131.65" x1="295.45" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_165" y2="131.25" x2="295.4" y1="139.55" x1="295.65" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <rect transform="rotate(-44.7916374206543 272.7096862792969,151.00000000000003) " id="svg_167" height="9.935484" width="11.806452" y="146.032258" x="266.806452" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <rect id="svg_169" transform="rotate(-44.7916374206543 284.2903137207031,139.80645751953128) " height="9.935484" width="11.806452" y="134.83871" x="278.387087" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_170" y2="158.612903" x2="272.032258" y1="143.580645" x1="273.322581" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_171" y2="150.419355" x2="280.096774" y1="151.645161" x1="265.064516" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_172" y2="147.322581" x2="283.83871" y1="132.225806" x1="285" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_173" y2="139.193548" x2="291.580645" y1="140.225806" x1="276.741935" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <rect id="svg_176" transform="rotate(43.58755111694336 319.5077819824218,139.89529418945312) " height="9.935484" width="11.806452" y="134.927551" x="313.604556" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <rect id="svg_177" transform="rotate(43.58755111694336 330.9500122070312,151.17500305175784) " height="9.935484" width="11.806452" y="146.207252" x="325.046775" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_179" y2="140.6" x2="326.85" y1="139.4" x1="312.1" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_180" y2="158.55" x2="331.9" y1="144" x1="330.05" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_181" y2="151.75" x2="338" y1="150.8" x1="323.35" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_182" y2="147.07638" x2="320.375876" y1="132.854519" x1="318.628618" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_183" y2="125.933333" x2="319.533333" y1="125.866667" x1="313.2" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_184" y2="125.733333" x2="319.2" y1="152.333333" x1="345.6" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_186" y2="156.066667" x2="345.666667" y1="152.133333" x1="345.333333" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_187" y2="130.8" x2="308.133333" y1="125.866667" x1="313.533333" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line stroke="#7c7c7c" id="svg_188" y2="130.466667" x2="308.333282" y1="139.266667" x1="307.933354" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect id="svg_193" height="8.368397" width="12.155213" y="171.549807" x="287.262725" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_195" y2="179.590948" x2="299.090683" y1="171.690059" x1="287.332851" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <rect stroke="#7c7c7c" id="svg_191" height="13.372891" width="36.741217" y="168.511465" x="283.77448" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="none"/>
      <line id="svg_196" y2="171.853687" x2="299.20756" y1="179.894828" x1="287.379602" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <rect id="svg_199" height="8.368397" width="12.155213" y="171.748483" x="303.789153" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_200" y2="171.748486" x2="316.061246" y1="179.789627" x1="304.233289" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <line id="svg_201" y2="179.848077" x2="315.710599" y1="171.690059" x1="303.906017" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f00" fill="none"/>
      <path id="svg_207" stroke="#7f7f00" transform="rotate(15.30609130859375 456.72412109374983,140.68966674804693) " d="m443.933518,140.689652l5.48169,-11.07806l14.61785,0l5.48169,11.07806l-5.48169,11.07807l-14.61785,0l-5.48169,-11.07807z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <path stroke="#7f7f7f" transform="rotate(-179.76219177246094 199.55207824707034,15.227038383483885) " id="svg_211" d="m190.082253,18.177169l3.551182,-5.900261l11.837275,0l3.551181,5.900261l-18.939638,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <line stroke="#ffffff" id="svg_215" y2="11.5" x2="208.133821" y1="11.5" x1="190.98047" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="3" fill="none"/>
      <line id="svg_218" y2="147.820037" x2="75.148423" y1="156.576994" x1="63.051948" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <path stroke="#ffffff" transform="rotate(143.5323028564453 77.2261199951172,157.58950805664062) " id="svg_220" d="m66.71344,165.790707l0,-16.402389l21.025355,16.402389l-21.025355,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <line id="svg_222" y2="12.260967" x2="184.503972" y1="12.260967" x1="173.4328" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f7f" fill="none"/>
      <line id="svg_223" y2="50.363052" x2="173.36091" y1="39.651334" x1="182.778595" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7f7f7f" fill="none"/>
      <path stroke="#ffffff" transform="rotate(41.590633392333984 182.6386260986328,51.89196014404297) " id="svg_224" d="m175.680014,59.259284l0,-14.734663l13.917125,14.734663l-13.917125,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <rect id="svg_226" height="9.561467" width="12.508987" y="1.69303" x="171.923095" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#ffffff" fill="#ffffff"/>
      <line id="svg_227" y2="156.55" x2="536.65" y1="146.25" x1="525.95" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <path stroke="#ffffff" transform="rotate(133.53179931640625 524.22900390625,157.04002380371094) " id="svg_228" d="m516.227489,165.085011l0,-16.08998l16.003015,16.08998l-16.003015,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <line id="svg_81" y2="182.927922" x2="71.447861" y1="164.974254" x1="71.383511" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_82" y2="182.606172" x2="88.436278" y1="164.974254" x1="88.371928" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_83" y2="182.50348" x2="105.263836" y1="164.871563" x1="105.199486" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_85" y2="182.767053" x2="122.509653" y1="165.135136" x1="122.445303" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_86" y2="182.702703" x2="139.62677" y1="165.070786" x1="139.56242" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7c7c7c" fill="none"/>
      <rect id="svg_234" height="0" width="0.072307" y="17.822371" x="403.700923" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#bf0000" fill="none"/>
      <rect stroke="#ffffff" id="svg_236" height="7.171374" width="5.013835" y="11.305553" x="402.450447" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <path stroke="#ffffff" transform="rotate(-179.9324493408203 398.24407958984375,14.477697372436522) " id="svg_237" d="m395.009134,17.765043l0,-6.574692l6.469893,6.574692l-6.469893,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <path stroke="#ffffff" transform="rotate(88.19215393066406 411.4425964355468,14.463231086730948) " id="svg_239" d="m408.285906,17.584516l0,-6.242571l6.313381,6.242571l-6.313381,0z" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <rect transform="rotate(1.8125001192092896 425.77163696289057,7.551014423369981) " stroke="#ffffff" id="svg_242" height="7.015306" width="11.670918" y="4.043361" x="419.936183" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="#ffffff"/>
      <rect stroke="#ffffff" transform="rotate(-45.923255920410156 421.3435363769531,51.39943313598634) " id="svg_243" height="10.224686" width="12.017172" y="46.287092" x="415.334967" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <path stroke="none" transform="rotate(-178.7411346435547 427.9104614257812,135.94625854492185) " id="svg_247" d="m423.702664,139.9657l0,-8.038878l8.41562,8.038878l-8.41562,0z" strokeOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <rect stroke="white" id="svg_251" height="6.759258" width="15.37037" y="183" x="439.120376" strokeOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <line id="svg_253" y2="181.896552" x2="481.551724" y1="164.310345" x1="481.896552" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7f7f7f" fill="none"/>
      <line id="svg_254" y2="181.896552" x2="507.068965" y1="164.310345" x1="507.068965" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7f7f7f" fill="none"/>
      <line id="svg_255" y2="181.551724" x2="533.62069" y1="164.655172" x1="533.275862" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" stroke="#7f7f7f" fill="none"/>
      <rect stroke="#7c7c7c" transform="rotate(-46.02914810180664 440.3132629394531,85.04537200927733) " fillOpacity="0" id="svg_256" height="26.67782" width="16.712868" y="71.706462" x="431.956813" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" fill="none"/>
      <line stroke="#7c7c7c" id="svg_258" y2="81.401379" x2="425.175173" y1="81.401379" x1="408.063448" fillOpacity="0" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect stroke="#7c7c7c" transform="rotate(-43.91908264160156 163.27584838867188,85.34482574462888) " fillOpacity="0" id="svg_259" height="17.796567" width="29.798683" y="76.44654" x="148.376518" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_262" y2="102.647887" x2="175.470383" y1="94.736269" x1="167.344938" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_263" y2="102.291508" x2="174.971452" y1="112.982883" x1="164.208801" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line stroke="#7c7c7c" id="svg_264" y2="122.248742" x2="166.846007" y1="112.769055" x1="163.994974" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <line id="svg_265" y2="122.462569" x2="166.560904" y1="122.320017" x1="201.20096" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_266" y2="80.837481" x2="201.628615" y1="81.19386" x1="180.103313" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
      <line id="svg_267" y2="88.606547" x2="145.890912" y1="83.973618" x1="141.044155" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="red" fill="none"/>
      <line transform="rotate(-7.32952880859375 459.1379394531247,85.51724243164065) " id="svg_268" y2="83.275862" x2="462.241379" y1="87.758621" x1="456.034483" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="red" fill="none"/>
      <line stroke="red" id="svg_269" y2="131.546895" x2="241.906207" y1="122.845518" x1="241.906207" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="none"/>
      <rect stroke="#ffffff" id="svg_278" height="18.604651" width="41.323793" y="182.728074" x="282.388206" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" fill="#ffffff"/>
      <rect id="svg_279" height="8.676208" width="10.554562" y="130.04471" x="296.610031" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#ffffff" fill="#ffffff"/>
      <line id="svg_283" y2="182.752318" x2="164.842572" y1="182.600925" x1="156.929774" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="null" stroke="#7c7c7c" fill="none"/>
     </g>
    </svg>

    )
  }
}
