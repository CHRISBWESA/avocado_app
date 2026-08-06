import { motion } from 'framer-motion';

const stages = [
  {
    name: 'Unripe',
    color: '#8D6E63',
    desc: 'Exhibiting a yellowish-green color and a very firm texture, these avocados may display signs of sun damage or other pre-harvest markings.',
    days: '2-4 days',
  },
  {
    name: 'Breaking',
    color: '#4CAF50',
    desc: 'Beginning to ripen, the skin darkens to a greyish olive green with brown hues. While still firm, the avocado yields slightly under pressure.',
    days: '1-2 days',
  },
  {
    name: 'Ripe (First Stage)',
    color: '#66BB6A',
    desc: 'Marked by the emergence of purple spots on the skin, the texture softens, indicating readiness for slicing while resisting mashing.',
    days: 'Now',
  },
  {
    name: 'Ripe (Second Stage)',
    color: '#43A047',
    desc: 'Considered the peak of shelf-life, the skin turns a uniform purple, the flesh is soft to the touch, and the stem appears dry and light brown. There are no significant signs of decay.',
    days: 'Use soon',
  },
  {
    name: 'Overripe',
    color: '#9CCC65',
    desc: 'The avocados show clear senescence signs, including mold spots on the skin and stem, and separation between the exocarp and mesocarp, indicating they are past their prime.',
    days: 'Past prime',
  },
];

export default function MaturityStages() {
  return (
    <section id="stages" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#4CAF50] font-semibold text-sm tracking-widest uppercase">
            Maturity Stages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-gradient">Know Exactly When</span>
          </h2>
          <p className="text-[#a5d6a7] max-w-xl mx-auto">
            Our AI classifies your avocado into one of four maturity stages with precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="glass rounded-3xl p-8 text-center hover:border-[rgba(76,175,80,0.4)] transition-all duration-300"
            >
              <div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${stage.color}33, ${stage.color}11)`,
                  border: `2px solid ${stage.color}55`,
                  boxShadow: `0 0 30px ${stage.color}22`,
                }}
              >
                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: stage.color }} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#e8f5e9]">
                {stage.name}
              </h3>
              <p className="text-[#a5d6a7] text-sm mb-3 leading-relaxed">
                {stage.desc}
              </p>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: `${stage.color}22`, color: stage.color }}
              >
                {stage.days}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}