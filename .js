const AMBIENTE = "HOMOL" //HOMOL ou PROD

const TIPO_RENDA_PR = ["PROJETO RURAL", "DECLARAÇÃO DE APTIDÃO AO PRONAF (DAP)",
    "NOTAS FISCAIS DE VENDA (RURAL)", "DECLARAÇÃO DE RENDA", "IRPF", "E-SOCIAL", "CONTRACHEQUE/HOLERITE SALÁRIO", "CTPS", "CONTRATO DE TRABALHO/ BOLSA DE ESTÁGIO",
    "DEMONSTRATIVO DE CRÉDITO DO BENEFÍCIO - APOSENTADORIA", "PRÓ-LABORE", "DECLARAÇÃO DEFIS", "CONTRATO DE PRESTAÇÃO DE SERVIÇOS",
    "NOTAS FISCAIS DE PRESTAÇÃO DE SERVIÇOS (ÚLTIMOS 12 MESES)", "CONTRATO DE LOCAÇÃO OU ARRENDAMENTOS"]

const TIPO_RENDA_PF = ["DECLARAÇÃO DE RENDA", "IRPF", "E-SOCIAL", "CONTRACHEQUE/HOLERITE SALÁRIO",
    "CTPS", "CONTRATO DE TRABALHO/ BOLSA DE ESTÁGIO", "DEMONSTRATIVO DE CRÉDITO DO BENEFÍCIO - APOSENTADORIA", "PRÓ-LABORE", "DECLARAÇÃO DEFIS",
    "CONTRATO DE PRESTAÇÃO DE SERVIÇOS", "NOTAS FISCAIS DE PRESTAÇÃO DE SERVIÇOS (ÚLTIMOS 12 MESES)", "CONTRATO DE LOCAÇÃO OU ARRENDAMENTOS"]

const TIPO_RENDA_PJ = ["FATURAMENTO", "PREVISÃO DE FATURAMENTO"]

const TIPOS_DOCUMENTOS_SOCIOS_PF = ["DADOS PATRIMONIAIS", "DADOS FINANCEIROS"];
const TIPOS_DOCUMENTOS_SOCIOS_PJ = ["DOCUMENTOS EMPRESARIAIS", "DADOS PATRIMONIAIS", "DADOS FINANCEIROS"];

//DADOS EMPRESARIAIS
const SUBTIPOS_DADOS_EMPRESARIAIS_SOCIOPJ = ["ÚLTIMA ALTERAÇÃO CONTRATUAL", "CONTRATOS/ALTERAÇÕES SOCIAIS"];
//DADOS PATRIMONIAIS    
const SUBTIPOS_DADOS_PATRIMONIAIS_PJ = ["COMPROVAÇÃO DO BEM"]
const SUBTIPOS_DADOS_PATRIMONIAIS_PF = ["COMPROVAÇÃO DO BEM"]


Zeev.Controller = {
    Settings: {
        MapFields: () => { // mapear os campos
            Zeev.Form.Functions.AddGrouping("Dados da solicitação", "DadosDaSolicitacao")
            Zeev.Form.Functions.AddGrouping("Dados do associado", "DadosDoAssociado")
            Zeev.Form.Functions.AddGrouping("Atualização cadastral", "AtualizacaoCadastral")
            Zeev.Form.Functions.AddGrouping("Autorizações", "Autorizacoes")
            Zeev.Form.Functions.AddGrouping("Informações básicas", "InformacoesBasicas")
            Zeev.Form.Functions.AddGrouping("Informações da pessoa jurídica", "InformacoesPessoaJuridica")
            Zeev.Form.Functions.AddGrouping("PEP", "PEP")
            Zeev.Form.Functions.AddGrouping("Dados patrimoniais", "DadosPatrimoniais")
            Zeev.Form.Functions.AddGrouping("Campo produtor", "CampoProdutor")
            Zeev.Form.Functions.AddGrouping("Cadastro de balanço", "CadastroBalanco")
            Zeev.Form.Functions.AddGrouping("Relacionamentos e poderes", "RelacionamentoEPoderes")
            Zeev.Form.Functions.AddGrouping("Dados financeiros", "DadosFinanceiros")
            Zeev.Form.Functions.AddGrouping("Sócios", "Socios")
            Zeev.Form.Functions.AddGrouping("Grupo econômico", "GrupoEconomico")
            Zeev.Form.Functions.AddGrouping("Fonte pagadora", "FontePagadora")
            Zeev.Form.Functions.AddGrouping("Questionário QRSAC", "QuestionarioQRSAC")
            Zeev.Form.Functions.AddGrouping("Abertura da conta", "AberturaConta")
            Zeev.Form.Functions.AddGrouping("Análise do cadastro", "AnaliseCadastro")
            Zeev.Form.Functions.AddGrouping("Devolução", "Devolucao")
            Zeev.Form.Functions.AddGrouping("VariaveisDoProcesso", "VariaveisDoProcesso")
        },
        MapTableMult: () => {
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Documentos relacionamentos e poderes", "RelacionamentoPoderes")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Patrimônios", "Patrimonios")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Comprovantes", "Comprovantes")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Pessoas", "Pessoas")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Documentos QRSAC", "QRSAC")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Ficha cadastral", "FichaCadastral")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Documentos da pessoa jurídica", "DocumentosJuridico")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Sócio pessoa física", "SocioPessoaFisica")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Sócio pessoa jurídica", "SocioPessoaJuridica")
            SicoobZeev.ferramentasHTML.tabela.mapearTabelaMultivalorada("Documentos do sócio", "DocumentosSocios")
        },
        MapEvents: () => {

            const ETAPA = Zeev.Form.Fields.VariaveisDoProcesso.Atividadeatual.GetValue()

            if (true) {
                //iniciando os eventos do Zeev
                const alterarCPFCNPJ = Zeev.Controller.Events.addEventAlterarCPFCNPJ
                Zeev.Form.Fields.DadosDoAssociado.CPFCNPJ.OnChange(alterarCPFCNPJ)
            }

            if (ETAPA == "SOLICITAR_CADASTRO") {
                const addEventTipoPessoa = Zeev.Controller.Events.addEventTipoPessoa
                Zeev.Form.Fields.DadosDaSolicitacao.TipoDaPessoa.OnChange(addEventTipoPessoa).TriggerChange()

                const addEventNomeRazaoSocial = Zeev.Controller.Events.addEventNomeRazaoSocial
                Zeev.Form.Fields.DadosDoAssociado.NomeRazaoSocial.OnChange(addEventNomeRazaoSocial).TriggerChange()
            }

            if (ETAPA == "CADASTRO_PF") {
                const alterarEstadoCivil = Zeev.Controller.Events.addEventAlterarEstadoCivil
                Zeev.Form.Fields.InformacoesBasicas.EstadoCivil.OnChange(alterarEstadoCivil).TriggerChange()

                const alterarCPFDoConjuge = Zeev.Controller.Events.addEventAlterarCPFCNPJDoConjuge
                Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.OnChange(alterarCPFDoConjuge)

                const mostrarCamposDoPatrimonio = Zeev.Controller.Events.addEventPossuiPatrimonio
                Zeev.Form.Fields.DadosPatrimoniais.PossuiPatrimonio.OnChange(mostrarCamposDoPatrimonio).TriggerChange()

                const mostrarCamposDoDadoFinanceiro = Zeev.Controller.Events.addEventPossuiDadosFinanceiros
                Zeev.Form.Fields.DadosFinanceiros.PossuiRenda.OnChange(mostrarCamposDoDadoFinanceiro).TriggerChange()

                const mostrarCamposRelacionamentoEPoderes = Zeev.Controller.Events.addEventPossuiRelacionamentosEPoderes
                Zeev.Form.Fields.RelacionamentoEPoderes.Tipo.OnChange(mostrarCamposRelacionamentoEPoderes).TriggerChange()

                Zeev.Controller.Events.addEventAdicionarLinhasNaTabelaContatos() //esse evento é utilizado para remapear todos os eventos da tabela

                Zeev.Controller.Events.addEventAlterarContato()

                const mostrarCampoEhPEP = Zeev.Controller.Events.addEventAlterarEhPEP
                Zeev.Form.Fields.PEP.EPEP.OnChange(mostrarCampoEhPEP).TriggerChange()

                const mostrarCamposGrupoEconomico = Zeev.Controller.Events.addEventPossuiGrupoEconomico
                Zeev.Form.Fields.GrupoEconomico.FormarGrupoEconomico.OnChange(mostrarCamposGrupoEconomico).TriggerChange()

                const mostrarCamposQRSAC = Zeev.Controller.Events.addEventMostrarCamposQRSAC
                Zeev.Form.Fields.QuestionarioQRSAC.PossuiQRSAC.OnChange(mostrarCamposQRSAC).TriggerChange()

                Zeev.Controller.Events.addEventAdicionarLinhasTabelaGrupoEconomico()

                Zeev.Controller.Events.addEventValidaCPFCNPJGrupoEconomicoCampoCPFCNPJ()
            }

            if (ETAPA == "CADASTRO_PJ") {
                const mostrarCamposDoPatrimonio = Zeev.Controller.Events.addEventPossuiPatrimonio
                Zeev.Form.Fields.DadosPatrimoniais.PossuiPatrimonio.OnChange(mostrarCamposDoPatrimonio).TriggerChange()

                const mostrarCamposDoDadoFinanceiro = Zeev.Controller.Events.addEventPossuiDadosFinanceiros
                Zeev.Form.Fields.DadosFinanceiros.PossuiRenda.OnChange(mostrarCamposDoDadoFinanceiro).TriggerChange()

                const mostrarCamposRelacionamentoEPoderes = Zeev.Controller.Events.addEventPossuiRelacionamentosEPoderes
                Zeev.Form.Fields.RelacionamentoEPoderes.Tipo.OnChange(mostrarCamposRelacionamentoEPoderes).TriggerChange()

                Zeev.Controller.Events.addEventAdicionarLinhasNaTabelaContatos() //esse evento é utilizado para remapear todos os eventos da tabela

                Zeev.Controller.Events.addEventAlterarContato()

                const mostrarCampoEhPEP = Zeev.Controller.Events.addEventAlterarEhPEP
                Zeev.Form.Fields.PEP.EPEP.OnChange(mostrarCampoEhPEP).TriggerChange()

                const mostrarCamposGrupoEconomico = Zeev.Controller.Events.addEventPossuiGrupoEconomico
                Zeev.Form.Fields.GrupoEconomico.FormarGrupoEconomico.OnChange(mostrarCamposGrupoEconomico).TriggerChange()

                const mostrarCamposQRSAC = Zeev.Controller.Events.addEventMostrarCamposQRSAC
                Zeev.Form.Fields.QuestionarioQRSAC.PossuiQRSAC.OnChange(mostrarCamposQRSAC).TriggerChange()

                const addEventAlteraTipoNaturezaJuridica = Zeev.Controller.Events.addEventAlteraTipoNaturezaJuridica
                Zeev.Form.Fields.InformacoesPessoaJuridica.TipoDaNaturezaJuridica.OnChange(addEventAlteraTipoNaturezaJuridica).TriggerChange()

                const addEventAlteraTipoSocioCadastroPJ = Zeev.Controller.Events.addEventAlteraTipoSocioCadastroPJ
                Zeev.Form.Fields.Socios.TipoDoSocio.OnChange(addEventAlteraTipoSocioCadastroPJ).TriggerChange()

                Zeev.Controller.Events.addEventAdicionarFetchCNAE()

                Zeev.Controller.Events.addEventAdicionarLinhasTabelaSocioPessoaFisica()

                Zeev.Controller.Events.addEventAlteraObrigatoriedadeSocioPessoaFisica()

                Zeev.Controller.Events.addEventAlteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()

                Zeev.Controller.Events.addEventAlteraObrigatoriedadeSocioPessoaFisicaCampoEPep()

                Zeev.Controller.Events.addEventvalidaCPFSocioPessoaFisicaCampoCPF()

                Zeev.Controller.Events.addEventPegaValorNomeSocioPessoaFisicaCampoNome()

                Zeev.Controller.Events.adicionarLinhasTabelaSocioPessoaJuridica()

                Zeev.Controller.Events.alteraObrigatoriedadeSocioPessoaJuridica()

                Zeev.Controller.Events.addEventAlteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()

                Zeev.Controller.Events.addEventValidaCNPJSocioPessoaJuridicaCampoCNPJ()

                Zeev.Controller.Events.addEventPegaValorNomeSocioPessoaJuridicaCampoNome()

                Zeev.Controller.Events.addEventDefinirTipoDocumentoSocios()

                Zeev.Controller.Events.addEventAdicionarLinhasTabelaDocumentosSocios()

                Zeev.Controller.Events.addEventDefinirSubtipoDocumentoSocios()

                Zeev.Controller.Events.addEventRemoverNomeSocioDocumentoSocio()

                Zeev.Controller.Events.addEventRemoverLinhasTabelaSocioPessoaJuridica()

                Zeev.Controller.Events.addEventRemoverLinhasTabelaSocioPessoaFisica()

                Zeev.Controller.Events.addEventAdicionarLinhasTabelaGrupoEconomico()

                Zeev.Controller.Events.addEventValidaCPFCNPJGrupoEconomicoCampoCPFCNPJ()
            }

            if (ETAPA == "CADASTRO_PR") {
                const alterarEstadoCivil = Zeev.Controller.Events.addEventAlterarEstadoCivil
                Zeev.Form.Fields.InformacoesBasicas.EstadoCivil.OnChange(alterarEstadoCivil).TriggerChange()

                const alterarCPFDoConjuge = Zeev.Controller.Events.addEventAlterarCPFCNPJDoConjuge
                Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.OnChange(alterarCPFDoConjuge)

                const mostrarCamposDoPatrimonio = Zeev.Controller.Events.addEventPossuiPatrimonio
                Zeev.Form.Fields.DadosPatrimoniais.PossuiPatrimonio.OnChange(mostrarCamposDoPatrimonio).TriggerChange()

                const mostrarCamposDoDadoFinanceiro = Zeev.Controller.Events.addEventPossuiDadosFinanceiros
                Zeev.Form.Fields.DadosFinanceiros.PossuiRenda.OnChange(mostrarCamposDoDadoFinanceiro).TriggerChange()

                const mostrarCamposRelacionamentoEPoderes = Zeev.Controller.Events.addEventPossuiRelacionamentosEPoderes
                Zeev.Form.Fields.RelacionamentoEPoderes.Tipo.OnChange(mostrarCamposRelacionamentoEPoderes).TriggerChange()

                Zeev.Controller.Events.addEventAdicionarLinhasNaTabelaContatos() //esse evento é utilizado para remapear todos os eventos da tabela

                Zeev.Controller.Events.addEventAlterarContato()

                const mostrarCampoEhPEP = Zeev.Controller.Events.addEventAlterarEhPEP
                Zeev.Form.Fields.PEP.EPEP.OnChange(mostrarCampoEhPEP).TriggerChange()

                const mostrarCamposGrupoEconomico = Zeev.Controller.Events.addEventPossuiGrupoEconomico
                Zeev.Form.Fields.GrupoEconomico.FormarGrupoEconomico.OnChange(mostrarCamposGrupoEconomico).TriggerChange()

                const mostrarCamposQRSAC = Zeev.Controller.Events.addEventMostrarCamposQRSAC
                Zeev.Form.Fields.QuestionarioQRSAC.PossuiQRSAC.OnChange(mostrarCamposQRSAC).TriggerChange()

                const addEventAlterarVisibilidadeCampoProdutor = Zeev.Controller.Events.addEventAlterarVisibilidadeCampoProdutor
                Zeev.Form.Fields.CampoProdutor.PossuiProjetoRural.OnChange(addEventAlterarVisibilidadeCampoProdutor).TriggerChange()

                Zeev.Controller.Events.addEventAdicionarLinhasTabelaGrupoEconomico()

                Zeev.Controller.Events.addEventValidaCPFCNPJGrupoEconomicoCampoCPFCNPJ()
            }

            if (ETAPA === "ATUALIZACAO_PF_PJ_PR") {
                const addEventAlterarVisibilidadeAtualizacaoCadastral = Zeev.Controller.Events.addEventAlterarVisibilidadeAtualizacaoCadastral
                Zeev.Form.Fields.AtualizacaoCadastral.TipoDaAtualizacao.OnChange(addEventAlterarVisibilidadeAtualizacaoCadastral).TriggerChange()

                const addEventAlteraTipoSocioCadastroPJ = Zeev.Controller.Events.addEventAlteraTipoSocioCadastroPJ
                Zeev.Form.Fields.Socios.TipoDoSocio.OnChange(addEventAlteraTipoSocioCadastroPJ).TriggerChange()

                Zeev.Controller.Events.addEventAdicionarFetchCNAE()

                Zeev.Controller.Events.addEventAdicionarLinhasTabelaSocioPessoaFisica()

                Zeev.Controller.Events.addEventAlteraObrigatoriedadeSocioPessoaFisica()

                Zeev.Controller.Events.addEventAlteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()

                Zeev.Controller.Events.addEventAlteraObrigatoriedadeSocioPessoaFisicaCampoEPep()

                Zeev.Controller.Events.addEventvalidaCPFSocioPessoaFisicaCampoCPF()

                Zeev.Controller.Events.addEventPegaValorNomeSocioPessoaFisicaCampoNome()

                Zeev.Controller.Events.adicionarLinhasTabelaSocioPessoaJuridica()

                Zeev.Controller.Events.alteraObrigatoriedadeSocioPessoaJuridica()

                Zeev.Controller.Events.addEventAlteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()

                Zeev.Controller.Events.addEventValidaCNPJSocioPessoaJuridicaCampoCNPJ()

                Zeev.Controller.Events.addEventPegaValorNomeSocioPessoaJuridicaCampoNome()

                Zeev.Controller.Events.addEventDefinirTipoDocumentoSocios()

                Zeev.Controller.Events.addEventAdicionarLinhasTabelaDocumentosSocios()

                Zeev.Controller.Events.addEventDefinirSubtipoDocumentoSocios()

                Zeev.Controller.Events.addEventRemoverNomeSocioDocumentoSocio()

                Zeev.Controller.Events.addEventRemoverLinhasTabelaSocioPessoaJuridica()

                Zeev.Controller.Events.addEventRemoverLinhasTabelaSocioPessoaFisica()

                Zeev.Controller.Events.addEventAdicionarLinhasTabelaGrupoEconomico()

                Zeev.Controller.Events.addEventValidaCPFCNPJGrupoEconomicoCampoCPFCNPJ()
            }

            if (ETAPA === "ANALISAR_PF") {
                const alterarEstadoCivil = Zeev.Controller.Events.addEventAlterarEstadoCivil
                Zeev.Form.Fields.InformacoesBasicas.EstadoCivil.OnChange(alterarEstadoCivil).TriggerChange()

                const alterarCPFDoConjuge = Zeev.Controller.Events.addEventAlterarCPFCNPJDoConjuge
                Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.OnChange(alterarCPFDoConjuge)

                const mostrarCamposDoPatrimonio = Zeev.Controller.Events.addEventPossuiPatrimonio
                Zeev.Form.Fields.DadosPatrimoniais.PossuiPatrimonio.OnChange(mostrarCamposDoPatrimonio).TriggerChange()

                const mostrarCamposDoDadoFinanceiro = Zeev.Controller.Events.addEventPossuiDadosFinanceiros
                Zeev.Form.Fields.DadosFinanceiros.PossuiRenda.OnChange(mostrarCamposDoDadoFinanceiro).TriggerChange()

                const mostrarCamposRelacionamentoEPoderes = Zeev.Controller.Events.addEventPossuiRelacionamentosEPoderes
                Zeev.Form.Fields.RelacionamentoEPoderes.Tipo.OnChange(mostrarCamposRelacionamentoEPoderes).TriggerChange()

                const mostrarCampoEhPEP = Zeev.Controller.Events.addEventAlterarEhPEP
                Zeev.Form.Fields.PEP.EPEP.OnChange(mostrarCampoEhPEP).TriggerChange()

                const mostrarCamposGrupoEconomico = Zeev.Controller.Events.addEventPossuiGrupoEconomico
                Zeev.Form.Fields.GrupoEconomico.FormarGrupoEconomico.OnChange(mostrarCamposGrupoEconomico).TriggerChange()

                const mostrarCamposQRSAC = Zeev.Controller.Events.addEventMostrarCamposQRSAC
                Zeev.Form.Fields.QuestionarioQRSAC.PossuiQRSAC.OnChange(mostrarCamposQRSAC).TriggerChange()

                const addEventCadastroDeOutraCooperativa = Zeev.Controller.Events.addEventCadastroDeOutraCooperativa
                Zeev.Form.Fields.AnaliseCadastro.CadastroDeOutraCooperativa.OnChange(addEventCadastroDeOutraCooperativa).TriggerChange()

                const addEventDecisaoDeAnalise = Zeev.Controller.Events.addEventDecisaoDeAnalise
                Zeev.Form.Fields.AnaliseCadastro.Decisao.OnChange(addEventDecisaoDeAnalise).TriggerChange()
            }

            if (ETAPA == "ANALISAR_PJ") {
                const mostrarCamposDoPatrimonio = Zeev.Controller.Events.addEventPossuiPatrimonio
                Zeev.Form.Fields.DadosPatrimoniais.PossuiPatrimonio.OnChange(mostrarCamposDoPatrimonio).TriggerChange()

                const mostrarCamposDoDadoFinanceiro = Zeev.Controller.Events.addEventPossuiDadosFinanceiros
                Zeev.Form.Fields.DadosFinanceiros.PossuiRenda.OnChange(mostrarCamposDoDadoFinanceiro).TriggerChange()

                const mostrarCamposRelacionamentoEPoderes = Zeev.Controller.Events.addEventPossuiRelacionamentosEPoderes
                Zeev.Form.Fields.RelacionamentoEPoderes.Tipo.OnChange(mostrarCamposRelacionamentoEPoderes).TriggerChange()

                const mostrarCampoEhPEP = Zeev.Controller.Events.addEventAlterarEhPEP
                Zeev.Form.Fields.PEP.EPEP.OnChange(mostrarCampoEhPEP).TriggerChange()

                const mostrarCamposGrupoEconomico = Zeev.Controller.Events.addEventPossuiGrupoEconomico
                Zeev.Form.Fields.GrupoEconomico.FormarGrupoEconomico.OnChange(mostrarCamposGrupoEconomico).TriggerChange()

                const mostrarCamposQRSAC = Zeev.Controller.Events.addEventMostrarCamposQRSAC
                Zeev.Form.Fields.QuestionarioQRSAC.PossuiQRSAC.OnChange(mostrarCamposQRSAC).TriggerChange()

                const addEventCadastroDeOutraCooperativa = Zeev.Controller.Events.addEventCadastroDeOutraCooperativa
                Zeev.Form.Fields.AnaliseCadastro.CadastroDeOutraCooperativa.OnChange(addEventCadastroDeOutraCooperativa).TriggerChange()

                const addEventDecisaoDeAnalise = Zeev.Controller.Events.addEventDecisaoDeAnalise
                Zeev.Form.Fields.AnaliseCadastro.Decisao.OnChange(addEventDecisaoDeAnalise).TriggerChange()

                const addEventAlteraTipoSocioAnalisarPJ = Zeev.Controller.Events.addEventAlteraTipoSocioAnalisarPJ
                Zeev.Form.Fields.Socios.TipoDoSocio.OnChange(addEventAlteraTipoSocioAnalisarPJ).TriggerChange()
            }

            if (ETAPA == "ANALISAR_PR") {
                const alterarEstadoCivil = Zeev.Controller.Events.addEventAlterarEstadoCivil
                Zeev.Form.Fields.InformacoesBasicas.EstadoCivil.OnChange(alterarEstadoCivil).TriggerChange()

                const alterarCPFDoConjuge = Zeev.Controller.Events.addEventAlterarCPFCNPJDoConjuge
                Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.OnChange(alterarCPFDoConjuge)

                const mostrarCamposDoPatrimonio = Zeev.Controller.Events.addEventPossuiPatrimonio
                Zeev.Form.Fields.DadosPatrimoniais.PossuiPatrimonio.OnChange(mostrarCamposDoPatrimonio).TriggerChange()

                const mostrarCamposDoDadoFinanceiro = Zeev.Controller.Events.addEventPossuiDadosFinanceiros
                Zeev.Form.Fields.DadosFinanceiros.PossuiRenda.OnChange(mostrarCamposDoDadoFinanceiro).TriggerChange()

                const mostrarCamposRelacionamentoEPoderes = Zeev.Controller.Events.addEventPossuiRelacionamentosEPoderes
                Zeev.Form.Fields.RelacionamentoEPoderes.Tipo.OnChange(mostrarCamposRelacionamentoEPoderes).TriggerChange()

                const mostrarCampoEhPEP = Zeev.Controller.Events.addEventAlterarEhPEP
                Zeev.Form.Fields.PEP.EPEP.OnChange(mostrarCampoEhPEP).TriggerChange()

                const mostrarCamposGrupoEconomico = Zeev.Controller.Events.addEventPossuiGrupoEconomico
                Zeev.Form.Fields.GrupoEconomico.FormarGrupoEconomico.OnChange(mostrarCamposGrupoEconomico).TriggerChange()

                const mostrarCamposQRSAC = Zeev.Controller.Events.addEventMostrarCamposQRSAC
                Zeev.Form.Fields.QuestionarioQRSAC.PossuiQRSAC.OnChange(mostrarCamposQRSAC).TriggerChange()

                const addEventAlterarVisibilidadeCampoProdutor = Zeev.Controller.Events.addEventAlterarVisibilidadeCampoProdutor
                Zeev.Form.Fields.CampoProdutor.PossuiProjetoRural.OnChange(addEventAlterarVisibilidadeCampoProdutor).TriggerChange()

                const addEventDecisaoDeAnalise = Zeev.Controller.Events.addEventDecisaoDeAnalise
                Zeev.Form.Fields.AnaliseCadastro.Decisao.OnChange(addEventDecisaoDeAnalise).TriggerChange()

                const addEventCadastroDeOutraCooperativa = Zeev.Controller.Events.addEventCadastroDeOutraCooperativa
                Zeev.Form.Fields.AnaliseCadastro.CadastroDeOutraCooperativa.OnChange(addEventCadastroDeOutraCooperativa).TriggerChange()

            }

            if (ETAPA === "AGUARDANDO_OUTRA_COOPERATIVA") {
                const mostrarCamposRelacionamentoEPoderes = Zeev.Controller.Events.addEventPossuiRelacionamentosEPoderes
                Zeev.Form.Fields.RelacionamentoEPoderes.Tipo.OnChange(mostrarCamposRelacionamentoEPoderes).TriggerChange()

                const mostrarCamposGrupoEconomico = Zeev.Controller.Events.addEventPossuiGrupoEconomico
                Zeev.Form.Fields.GrupoEconomico.FormarGrupoEconomico.OnChange(mostrarCamposGrupoEconomico).TriggerChange()

                const mostrarCamposQRSAC = Zeev.Controller.Events.addEventMostrarCamposQRSAC
                Zeev.Form.Fields.QuestionarioQRSAC.PossuiQRSAC.OnChange(mostrarCamposQRSAC).TriggerChange()

                const addEventCadastroDeOutraCooperativa = Zeev.Controller.Events.addEventCadastroDeOutraCooperativa
                Zeev.Form.Fields.AnaliseCadastro.CadastroDeOutraCooperativa.OnChange(addEventCadastroDeOutraCooperativa).TriggerChange()

                const addEventMostrarCamposInformacoesPessoaJuridica = Zeev.Controller.Events.addEventMostrarCamposInformacoesPessoaJuridica
                Zeev.Form.Fields.DadosDaSolicitacao.TipoDaPessoa.OnChange(addEventMostrarCamposInformacoesPessoaJuridica).TriggerChange()
            }

            if (ETAPA === "FORMALIZAR_DOCUMENTOS") {
                const addEventSeguirComAberturaDeConta = Zeev.Controller.Events.addEventSeguirComAberturaDeConta
                Zeev.Form.Fields.AberturaConta.VaiSeguirComAberturaDaConta.OnChange(addEventSeguirComAberturaDeConta).TriggerChange()

            }

            if (ETAPA === "FINALIZAR_CADASTRO") {
                const mostrarCampoEhPEP = Zeev.Controller.Events.addEventAlterarEhPEP
                Zeev.Form.Fields.PEP.EPEP.OnChange(mostrarCampoEhPEP).TriggerChange()
            }
        },
        InitForm: () => { },
        MapDataSource: () => { },
        Init: () => {
            Zeev.Resources.Functions.MapNativeResources()
            Zeev.Controller.Settings.MapFields()
            Zeev.Controller.Settings.MapTableMult()
            Zeev.Controller.Settings.MapEvents()
            Zeev.Controller.DefaultFunctions()
            Zeev.Controller.Settings.InitForm()
        },
    },
    CustomerRules: {},
    Events: {
        addEventAdicionarLinhasNaTabelaContatos: () => {
            adicionarLinhasTabelaContatos()
        },
        addEventAlterarCPFCNPJ: () => {
            validarCPFCNPJDoCooperado()
        },
        addEventAlterarContato: () => {
            alterarTabelaContato()
        },
        addEventAlterarCPFCNPJDoConjuge: () => {
            validarCPFCNPJDoConjuge()
        },
        addEventAlterarEstadoCivil: () => {
            tornarCamposObrigatoriosConformeEstadoCivil()
        },
        addEventPossuiPatrimonio: () => {
            mostrarCamposdoPatrimonio()
        },
        addEventPossuiDadosFinanceiros: () => {
            mostrarCamposdaRenda()
        },
        addEventPossuiGrupoEconomico: () => {
            mostrarCamposGrupoEconomico()
        },
        addEventPossuiRelacionamentosEPoderes: () => {
            mostrarCamposRelacionamentoEPoderes()
        },
        addEventAlterarEhPEP: () => {
            mostrarCamposdoPEP()
        },
        addEventMostrarCamposQRSAC: () => {
            mostrarCamposQRSAC()
        },
        addEventCadastroDeOutraCooperativa: () => {
            mostrarCampoNumeroCooperativa()
        },
        addEventDecisaoDeAnalise: () => {
            mostrarCamposDeDevolução()
        },
        addEventSeguirComAberturaDeConta: () => {
            seguirComAberturaDeConta()
        },
        addEventTipoPessoa: () => {
            mudarVisualizacaoDadosAssociado()
        },
        addEventNomeRazaoSocial: () => {
            mostrarCampoMei()
        },
        addEventAlteraTipoNaturezaJuridica: () => {
            definirDocumentosObrigatoriosPJ()
        },
        addEventAdicionarFetchCNAE: () => {
            adicionarCNAE()
        },
        addEventAlteraTipoSocioCadastroPJ: () => {
            alterarVisibilidadeTabelaSociosCadastroPJ()
        },
        addEventAlteraTipoSocioAnalisarPJ: () => {
            alterarVisibilidadeTabelaSociosAnalisarPJ()
        },
        addEventAdicionarLinhasTabelaSocioPessoaFisica: () => {
            adicionarLinhasTabelaSocioPessoaFisica()
        },
        addEventAlteraObrigatoriedadeSocioPessoaFisica: () => {
            alteraObrigatoriedadeSocioPessoaFisica()
        },
        addEventAlteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil: () => {
            alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()
        },
        addEventAlteraObrigatoriedadeSocioPessoaFisicaCampoEPep: () => {
            alteraObrigatoriedadeSocioPessoaFisicaCampoEPep()
        },
        addEventvalidaCPFSocioPessoaFisicaCampoCPF: () => {
            validaCPFSocioPessoaFisicaCampoCPF()
        },
        addEventPegaValorNomeSocioPessoaFisicaCampoNome: () => {
            pegaValorNomeSocioPessoaFisicaCampoNome()
        },
        adicionarLinhasTabelaSocioPessoaJuridica: () => {
            adicionarLinhasTabelaSocioPessoaJuridica()
        },
        alteraObrigatoriedadeSocioPessoaJuridica: () => {
            alteraObrigatoriedadeSocioPessoaJuridica()
        },
        addEventAlteraObrigatoriedadeSocioPessoaJuridicaCampoEPep: () => {
            alteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()
        },
        addEventValidaCNPJSocioPessoaJuridicaCampoCNPJ: () => {
            validaCNPJSocioPessoaJuridicaCampoCNPJ()
        },
        addEventPegaValorNomeSocioPessoaJuridicaCampoNome: () => {
            pegaValorNomeSocioPessoaJuridicaCampoNome()
        },
        addEventDefinirTipoDocumentoSocios: () => {
            definirTipoDocumentoSocios()
        },
        addEventAdicionarLinhasTabelaDocumentosSocios: () => {
            adicionarLinhasTabelaDocumentosSocios()
        },
        addEventRemoverNomeSocioDocumentoSocio: () => {
            removerNomeSocioDocumentoSocio()
        },
        addEventDefinirSubtipoDocumentoSocios: () => {
            definirSubtipoDocumentoSocios()
        },
        addEventRemoverLinhasTabelaSocioPessoaJuridica: () => {
            removerLinhasTabelaSocioPessoaJuridica()
        },
        addEventRemoverLinhasTabelaSocioPessoaFisica: () => {
            removerLinhasTabelaSocioPessoaFisica()
        },
        addEventMostrarCamposInformacoesPessoaJuridica: () => {
            mostrarCamposInformacoesPessoaJuridica()
        },
        addEventAlterarVisibilidadeCampoProdutor: () => {
            alterarVisibilidadeCampoProdutor()
        },
        addEventAdicionarLinhasTabelaGrupoEconomico: () => {
            adicionarLinhasTabelaGrupoEconomico()
        },
        addEventValidaCPFCNPJGrupoEconomicoCampoCPFCNPJ: () => {
            validaCPFCNPJGrupoEconomicoCampoCPFCNPJ()
        },
        addEventAlterarVisibilidadeAtualizacaoCadastral: () => {
            alterarVisibilidadeAtualizacaoCadastral()
        }
    },
    DefaultFunctions: () => {
        //ocultarGrupos()

        const ETAPA = Zeev.Form.Fields.VariaveisDoProcesso.Atividadeatual.GetValue()

        if (ETAPA === "SOLICITAR_CADASTRO") {
            definirResponsaveisProcesso()
        } else if (ETAPA === "CADASTRO_PF") {
            definirComprovantesDeRenda()
        } else if (ETAPA === "CADASTRO_PJ") {
            definirComprovantesDeRenda()
            definirNomeDosSociosDocumentoSocio()
        } else if (ETAPA === "CADASTRO_PR") {
            definirComprovantesDeRenda()
        } else if (ETAPA === "ANALISAR_PJ") {
            calcularQuantidadeDeSocios()
        }
    }
}

function alterarVisibilidadeAtualizacaoCadastral() {
    const tiposAtualizacao = Zeev.Form.Fields.AtualizacaoCadastral.TipoDaAtualizacao.GetValue()


    for (let tipo of tiposAtualizacao) {

        if (tipo.value === "Cadastro de balanço") {
            if (tipo.checked) {
                console.log("cheked")
            } else {
                console.log("not chequed")
            }
        }

        if (tipo.value === "Campo produtor") {
            if (tipo.checked) {
                console.log("cheked")
            } else {
                console.log("not chequed")
            }
        }

        if (tipo.value === "Dados do associado") {
            if (tipo.checked) {
                console.log("cheked")
            } else {
                console.log("not chequed")
            }
        }

        if (tipo.value === "Financeiro") {
            if (tipo.checked) {
                Zeev.Form.Tables.Comprovantes.Reveal()
            } else {
                Zeev.Form.Tables.Comprovantes.Clean()
                Zeev.Form.Tables.Comprovantes.DontShow(true)
            }
        }

        if (tipo.value === "Fonte pagadora") {
            if (tipo.checked) {
                Zeev.Form.Fields.FontePagadora.Reveal()
            } else {
                Zeev.Form.Fields.FontePagadora.DontShow(true)
            }
        }

        if (tipo.value === "Grupo econômico") {
            if (tipo.checked) {
                Zeev.Form.Tables.Pessoas.Reveal()
            } else {
                Zeev.Form.Tables.Pessoas.Clean()
                Zeev.Form.Tables.Pessoas.DontShow(true)
            }
        }

        if (tipo.value === "Patrimoniais") {
            if (tipo.checked) {
                Zeev.Form.Tables.Patrimonios.Reveal()
            } else {
                Zeev.Form.Tables.Patrimonios.Clean()
                Zeev.Form.Tables.Patrimonios.DontShow(true)
            }
        }

        if (tipo.value === "Questionário Risco Sócio Ambiental") {
            if (tipo.checked) {
                Zeev.Form.Tables.QRSAC.Reveal()
            } else {
                Zeev.Form.Tables.QRSAC.Clean()
                Zeev.Form.Tables.QRSAC.DontShow(true)
            }
        }

        if (tipo.value === "Relacionamento e poderes") {
            if (tipo.checked) {
                Zeev.Form.Tables.RelacionamentoPoderes.Reveal()
            } else {
                Zeev.Form.Tables.RelacionamentoPoderes.Clean()
                Zeev.Form.Tables.RelacionamentoPoderes.DontShow(true)
            }
        }

        if (tipo.value === "Sócios") {
            if (tipo.checked) {
                Zeev.Form.Fields.Socios.Reveal()
                Zeev.Form.Tables.DocumentosSocios.Reveal()
            } else {
                Zeev.Form.Fields.Socios.DontShow(true)
                Zeev.Form.Tables.DocumentosSocios.Clean()
                Zeev.Form.Tables.DocumentosSocios.DontShow(true)
            }
        }
    }
}

function alterarVisibilidadeCampoProdutor() {
    const possuiProjetoRural = Zeev.Form.Fields.CampoProdutor.PossuiProjetoRural.GetValue()

    if (possuiProjetoRural === "Sim") {
        Zeev.Form.Fields.CampoProdutor.ProjetoRural.Reveal()
        Zeev.Form.Fields.CampoProdutor.DescricaoDaProdutividade.DontShow(true)
    } else if (possuiProjetoRural === "Não") {
        Zeev.Form.Fields.CampoProdutor.DescricaoDaProdutividade.Reveal()
        Zeev.Form.Fields.CampoProdutor.ProjetoRural.DontShow(true)
    } else {
        Zeev.Form.Fields.CampoProdutor.DescricaoDaProdutividade.DontShow(true)
        Zeev.Form.Fields.CampoProdutor.ProjetoRural.DontShow(true)
    }
}

function calcularQuantidadeDeSocios() {
    const tiposSocio = Zeev.Form.Fields.Socios.TipoDoSocio.GetValue()

    let pessoaFisica = 0
    let pessoaJuridica = 0
    for (let tipoSocio of tiposSocio) {

        if (tipoSocio.value === "Sócio pessoa física") {
            pessoaFisica = Zeev.Form.Tables.SocioPessoaFisica.Rows.length
        }

        if (tipoSocio.value === "Sócio pessoa jurídica") {
            pessoaJuridica = Zeev.Form.Tables.SocioPessoaJuridica.Rows.length
        }
    }

    Zeev.Form.Fields.Socios.QuantidadeDeSocios.SetValue((pessoaFisica + pessoaJuridica))
    Zeev.Form.Fields.Socios.QuantidadeDeSocios.ReadOnly()
}

function alterarVisibilidadeTabelaSociosCadastroPJ() {
    const tiposSocio = Zeev.Form.Fields.Socios.TipoDoSocio.GetValue()

    for (let tipoSocio of tiposSocio) {
        if (tipoSocio.value === "Sócio pessoa física") {
            if (tipoSocio.checked) {
                Zeev.Form.Tables.SocioPessoaFisica.Reveal()
                alteraObrigatoriedadeSocioPessoaFisica()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEPep()
                validaCPFSocioPessoaFisicaCampoCPF()
                pegaValorNomeSocioPessoaFisicaCampoNome()
            } else {
                Zeev.Form.Tables.SocioPessoaFisica.Clean()
                Zeev.Form.Tables.SocioPessoaFisica.DontShow()
            }
        }

        if (tipoSocio.value === "Sócio pessoa jurídica") {
            if (tipoSocio.checked) {
                Zeev.Form.Tables.SocioPessoaJuridica.Reveal()
                alteraObrigatoriedadeSocioPessoaJuridica()
                alteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()
                validaCNPJSocioPessoaJuridicaCampoCNPJ()
                pegaValorNomeSocioPessoaJuridicaCampoNome()
            } else {
                Zeev.Form.Tables.SocioPessoaJuridica.Clean()
                Zeev.Form.Tables.SocioPessoaJuridica.DontShow()
            }
        }
    }
}

function alterarVisibilidadeTabelaSociosAnalisarPJ() {
    const tiposSocio = Zeev.Form.Fields.Socios.TipoDoSocio.GetValue()

    Zeev.Form.Tables.SocioPessoaFisica.DontShow()
    Zeev.Form.Tables.SocioPessoaJuridica.DontShow()

    for (let tipoSocio of tiposSocio) {
        if (tipoSocio.value === "Sócio pessoa física") {
            Zeev.Form.Tables.SocioPessoaFisica.Reveal()
        }

        if (tipoSocio.value === "Sócio pessoa jurídica") {
            Zeev.Form.Tables.SocioPessoaJuridica.Reveal()
        }
    }
}

function adicionarCNAE() {
    document.querySelector("[data-search-and-fill-for='inpcodigoCNAE']").addEventListener("click", () => {

        const cnae = Zeev.Form.Fields.InformacoesPessoaJuridica.CodigoCNAE.GetValue()

        fetch(`https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/${cnae}`)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if (res.length === 0) {
                    cryo_alert("Código CNAE não encontrado")
                    Zeev.Form.Fields.InformacoesPessoaJuridica.CodigoCNAE.SetValue("")
                    Zeev.Form.Fields.InformacoesPessoaJuridica.DescricaoDoCNAE.SetValue("")
                } else {
                    if (!cnaeInvalidos.find(cnaeInvalido => cnaeInvalido.COD_CNAE === cnae)) {
                        Zeev.Form.Fields.InformacoesPessoaJuridica.DescricaoDoCNAE.SetValue(res[0].descricao)
                    } else {
                        Zeev.Form.Fields.InformacoesPessoaJuridica.CodigoCNAE.SetValue("")
                        Zeev.Form.Fields.InformacoesPessoaJuridica.DescricaoDoCNAE.SetValue("")
                        cryo_alert("Esse CNAE não é autorizado pela cooperativa")
                    }
                }
            }).catch(() => {
                cryo_alert("Erro ao pesquisar o código CNAE, informe a TI da cooperativa e insira manualmente as informações")
            })
    })
}

function definirDocumentosObrigatoriosPJ() {
    const TipoDaNaturezaJuridica = Zeev.Form.Fields.InformacoesPessoaJuridica.TipoDaNaturezaJuridica.GetValue()

    const documentosObrigatorios = []

    switch (TipoDaNaturezaJuridica) {
        case '':
            break
        case 'CARTÓRIOS E AUTARQUIAS':
            documentosObrigatorios.push("ATO LEGAL DE CRIAÇÃO DO ÓRGÃO PÚBLICO", "ATO NOMEAÇÃO/ELEIÇÃO/POSSE DO GESTOR")
            break
        case 'OUTRAS':
            documentosObrigatorios.push("ULTIMA ALTERAÇÃO CONTRATUAL CONSOLIDADA", "DEMAIS CONTRATOS/ALTERAÇÕES SOCIAIS")
            break
        case 'CONDOMÍNIOS':
            documentosObrigatorios.push("CONVENÇÃO DE CONDOMINIO", "ATA DE ASSEMBLEIA ELEIÇÃO/POSSE DO ADM")
            break
        default:
            documentosObrigatorios.push("ESTATUTO", "ATA DE ASSEMBLEIA ELEIÇÃO/POSSE DO ADM")
            break
    }

    if (documentosObrigatorios.length > 0) {
        const documentosTabela = SicoobZeev.ferramentasHTML.tabela.obterDadosTabelaMultivaloradaPorColuna("Documentos da pessoa jurídica", "inptipoDoDocumento")

        if (JSON.stringify(documentosObrigatorios) != JSON.stringify(documentosTabela)) {
            Zeev.Form.Tables.DocumentosJuridico.Clean()
            Zeev.Form.Tables.DocumentosJuridico.InsertRows(documentosObrigatorios.length)

            for (let i in documentosObrigatorios) {
                Zeev.Form.Tables.DocumentosJuridico.Rows[i].Tr.Documento.CleanValue()
                Zeev.Form.Tables.DocumentosJuridico.Rows[i].Tr.TipoDoDocumento.SetValue(documentosObrigatorios[i])
                Zeev.Form.Tables.DocumentosJuridico.Rows[i].Tr.TipoDoDocumento.ReadOnly()
            }

            Zeev.Form.Tables.DocumentosJuridico.Reveal()
        }

        for (let i in documentosTabela) {
            Zeev.Form.Tables.DocumentosJuridico.Rows[i].Tr.TipoDoDocumento.ReadOnly()
            Zeev.Form.Tables.DocumentosJuridico.Rows[i].Tr.BtnDelete.style.display = "none"
        }
        Zeev.Form.Tables.DocumentosJuridico.ButtonInsert.DontShow()

        Zeev.Form.Tables.DocumentosJuridico.Reveal()
    } else {
        Zeev.Form.Tables.DocumentosJuridico.Clean()
        Zeev.Form.Tables.DocumentosJuridico.DontShow()

        Zeev.Form.Tables.DocumentosJuridico.ButtonInsert.DontShow()
        Zeev.Form.Tables.DocumentosJuridico.Rows[0].Tr.BtnDelete.style.display = "none"
    }
}

function alterarTabelaContato() {
    // Seleciona todos os elementos do DOM que possuem o atributo 'xname' com o valor 'inptipoDoContato' e os armazena em uma lista NodeList.
    const camposTipoDoContato = document.querySelectorAll('[xname=inptipoDoContato]')

    // Seleciona todos os elementos do DOM que possuem o atributo 'xname' com o valor 'inpnomeDoContato' e os armazena em uma lista NodeList.
    const camposNomeDoContato = document.querySelectorAll('[xname=inpnomeDoContato]')

    const nomeDoCooperado = document.getElementById('inpnomeRazaoSocial').value

    // Itera sobre todos os elementos da lista NodeList 'camposTipoDoContato'.
    camposTipoDoContato.forEach((node, index) => {
        // Adiciona um ouvinte de evento para o evento 'input' em cada elemento.
        node.addEventListener('input', function (event) {
            // Dentro do manipulador de eventos 'input', obtém o valor atual do campo de entrada associado.
            let tipoContato = node.value
            // Exibe o valor atual do campo de entrada no console.

            if (tipoContato == "Pessoal") {
                camposNomeDoContato[index].value = nomeDoCooperado
                camposNomeDoContato[index].setAttribute("readOnly", "true")
            } else {
                camposNomeDoContato[index].value = ""
                camposNomeDoContato[index].removeAttribute("readOnly")
            }
        })

        let tipoContato = node.value
        // Exibe o valor atual do campo de entrada no console.

        if (tipoContato == "Pessoal") {
            camposNomeDoContato[index].value = nomeDoCooperado
            camposNomeDoContato[index].setAttribute("readOnly", "true")
        } else {
            camposNomeDoContato[index].value = ""
            camposNomeDoContato[index].removeAttribute("readOnly")
        }
    })
}

function adicionarLinhasTabelaContatos() {
    var tables = document.querySelectorAll('table')

    tables.forEach(function (table) {
        var caption = table.querySelector('caption')
        if (caption && caption.textContent.trim() === "Contatos") {

            // Ocultar a tabela pai
            const btnInsertNewRow = table.querySelector("button[id=btnInsertNewRow]")
            btnInsertNewRow.addEventListener('click', function (event) {
                Zeev.Controller.Events.addEventAlterarContato()
            })
        }
    })
}

function adicionarLinhasTabelaSocioPessoaFisica() {
    let table = document.getElementById("SocioPessoaFisica")
    const btnInsertNewRow = table.querySelector("button[id=btnInsertNewRow]")
    btnInsertNewRow.addEventListener('click', function () {
        alteraObrigatoriedadeSocioPessoaFisica()
        alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()
        alteraObrigatoriedadeSocioPessoaFisicaCampoEPep()
        validaCPFSocioPessoaFisicaCampoCPF()
        pegaValorNomeSocioPessoaFisicaCampoNome()
        removerLinhasTabelaSocioPessoaFisica()
    })
}

function removerLinhasTabelaSocioPessoaFisica() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaFisica.Rows.length; index++) {
        Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.BtnDelete.addEventListener("click", () => {
            atualizandoSelectSocioTabelaDocumentoSocio()
        })
    }
}

function alteraObrigatoriedadeSocioPessoaFisica() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaFisica.Rows.length; index++) {

        Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.TipoDaSolicitacaoWdcr.OnChange(() => {
            try {
                const tipoSolicitacao = Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.TipoDaSolicitacaoWdcr.GetValue()

                if (tipoSolicitacao === "Cadastro novo") {
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.AutorizacaoDeConsulta.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.DocumentoDeIdentificacaoUoxf.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.NaturalidadeUcce.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EscolaridadeNhkz.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.ProfissaoEwsa.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EstadoCivilQqwt.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.ComprovanteDoEndereco.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EmailQqtr.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.TelefoneHvet.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EPEPAeht.Require()
                } else if (tipoSolicitacao === "Atualização cadastral" || tipoSolicitacao === "") {
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.AutorizacaoDeConsulta.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.DocumentoDeIdentificacaoUoxf.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.NaturalidadeUcce.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EscolaridadeNhkz.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.ProfissaoEwsa.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EstadoCivilQqwt.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.ComprovanteDoEndereco.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EmailQqtr.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.TelefoneHvet.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EPEPAeht.DontRequire()
                }
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Física")
                alteraObrigatoriedadeSocioPessoaFisica()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEPep()
                validaCPFSocioPessoaFisicaCampoCPF()
                pegaValorNomeSocioPessoaFisicaCampoNome()
            }
        }).TriggerChange()
    }
}

function pegaValorNomeSocioPessoaFisicaCampoNome() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaFisica.Rows.length; index++) {
        Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.Nome.OnChange(() => {
            try {
                atualizandoSelectSocioTabelaDocumentoSocio()
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Física")
                alteraObrigatoriedadeSocioPessoaFisica()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEPep()
                validaCPFSocioPessoaFisicaCampoCPF()
                pegaValorNomeSocioPessoaFisicaCampoNome()
            }
        }).TriggerChange()
    }
}

function validaCPFSocioPessoaFisicaCampoCPF() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaFisica.Rows.length; index++) {

        Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.CPF.OnChange(() => {
            try {
                ValidarCPFCNPJSocios(Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.CPF, "PF")
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Física")
                alteraObrigatoriedadeSocioPessoaFisica()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEPep()
                validaCPFSocioPessoaFisicaCampoCPF()
                pegaValorNomeSocioPessoaFisicaCampoNome()
            }
        }).TriggerChange()
    }
}

function alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaFisica.Rows.length; index++) {

        Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EstadoCivilQqwt.OnChange(() => {
            try {
                const estadoCivil = Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EstadoCivilQqwt.GetValue()

                if (estadoCivil != "SOLTEIRO(A)" && estadoCivil != "") {
                    //comporvante Estado civil
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.ComprovanteDoEstadoCivil.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.ComprovanteDoEstadoCivil.element
                        .parentNode.querySelector('[id="btnUploadcomprovanteDoEstadoCivil"]').style.display = ""

                    if (estadoCivil === "UNIÃO ESTÁVEL" || estadoCivil === "CASADO(A)") {
                        Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.CPFDoConjugeUsvf.Reveal()
                    } else {
                        Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.CPFDoConjugeUsvf.DontShow(true)
                    }
                }
                else {
                    //comporvante Estado civil
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.ComprovanteDoEstadoCivil.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.ComprovanteDoEstadoCivil.element
                        .parentNode.querySelector('[id="btnUploadcomprovanteDoEstadoCivil"]').style.display = "none"

                    //cpf conjuge
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.CPFDoConjugeUsvf.DontShow(true)
                }
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Física")
                alteraObrigatoriedadeSocioPessoaFisica()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEPep()
                validaCPFSocioPessoaFisicaCampoCPF()
                pegaValorNomeSocioPessoaFisicaCampoNome()
            }
        }).TriggerChange()
    }
}

function alteraObrigatoriedadeSocioPessoaFisicaCampoEPep() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaFisica.Rows.length; index++) {

        Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EPEPAeht.OnChange(() => {
            try {
                const ehPep = Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.EPEPAeht.GetValue()

                if (ehPep === "Sim") {
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.FormularioPEPBomz.Require()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.FormularioPEPBomz.element
                        .parentNode.querySelector('[id="btnUploadformularioPEP-Bomz"]').style.display = ""
                }
                else {
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.FormularioPEPBomz.DontRequire()
                    Zeev.Form.Tables.SocioPessoaFisica.Rows[index].Tr.FormularioPEPBomz.element
                        .parentNode.querySelector('[id="btnUploadformularioPEP-Bomz"]').style.display = "none"
                }
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Física")
                alteraObrigatoriedadeSocioPessoaFisica()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEstadoCivil()
                alteraObrigatoriedadeSocioPessoaFisicaCampoEPep()
                validaCPFSocioPessoaFisicaCampoCPF()
                pegaValorNomeSocioPessoaFisicaCampoNome()
            }
        }).TriggerChange()
    }
}

function adicionarLinhasTabelaSocioPessoaJuridica() {
    let table = document.getElementById("SocioPessoaJuridica")
    const btnInsertNewRow = table.querySelector("button[id=btnInsertNewRow]")
    btnInsertNewRow.addEventListener('click', function () {
        alteraObrigatoriedadeSocioPessoaJuridica()
        alteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()
        validaCNPJSocioPessoaJuridicaCampoCNPJ()
        pegaValorNomeSocioPessoaJuridicaCampoNome()
        removerLinhasTabelaSocioPessoaJuridica()
    })
}

function removerLinhasTabelaSocioPessoaJuridica() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaJuridica.Rows.length; index++) {
        Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.BtnDelete.addEventListener("click", () => {
            atualizandoSelectSocioTabelaDocumentoSocio()
        })
    }
}

function alteraObrigatoriedadeSocioPessoaJuridica() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaJuridica.Rows.length; index++) {

        Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.TipoDaSolicitacaoHtll.OnChange(() => {
            try {
                const tipoSolicitacao = Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.TipoDaSolicitacaoHtll.GetValue()

                if (tipoSolicitacao === "Cadastro novo") {
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.EPEPHogs.Require()
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.TelefoneQfsz.Require()
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.EMail.Require()
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.AutorizacaoDeConsultasPuhk.Require()
                } else if (tipoSolicitacao === "Atualização cadastral" || tipoSolicitacao === "") {
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.EPEPHogs.DontRequire()
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.TelefoneQfsz.DontRequire()
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.EMail.DontRequire()
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.AutorizacaoDeConsultasPuhk.DontRequire()
                }
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Jurídica")
                alteraObrigatoriedadeSocioPessoaJuridica()
                alteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()
                validaCNPJSocioPessoaJuridicaCampoCNPJ()
                pegaValorNomeSocioPessoaJuridicaCampoNome()
            }
        }).TriggerChange()
    }
}

function validaCNPJSocioPessoaJuridicaCampoCNPJ() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaJuridica.Rows.length; index++) {

        Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.CNPJ.OnChange(() => {
            try {
                ValidarCPFCNPJSocios(Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.CNPJ, "PJ")
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Jurídica")
                alteraObrigatoriedadeSocioPessoaJuridica()
                alteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()
                validaCNPJSocioPessoaJuridicaCampoCNPJ()
                pegaValorNomeSocioPessoaJuridicaCampoNome()
            }
        }).TriggerChange()
    }
}

function pegaValorNomeSocioPessoaJuridicaCampoNome() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaJuridica.Rows.length; index++) {
        Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.RazaoSocial.OnChange(() => {
            try {
                atualizandoSelectSocioTabelaDocumentoSocio()
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Jurídica")
                alteraObrigatoriedadeSocioPessoaJuridica()
                alteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()
                validaCNPJSocioPessoaJuridicaCampoCNPJ()
                pegaValorNomeSocioPessoaJuridicaCampoNome()
            }
        }).TriggerChange()
    }
}

function alteraObrigatoriedadeSocioPessoaJuridicaCampoEPep() {
    for (let index = 0; index < Zeev.Form.Tables.SocioPessoaJuridica.Rows.length; index++) {

        Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.EPEPHogs.OnChange(() => {
            try {
                const ehPep = Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.EPEPHogs.GetValue()

                if (ehPep === "Sim") {
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.FormularioPEPIrfk.Require()
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.FormularioPEPIrfk.element
                        .parentNode.querySelector('[id="btnUploadformularioPEP-Irfk"]').style.display = ""
                }
                else {
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.FormularioPEPIrfk.DontRequire()
                    Zeev.Form.Tables.SocioPessoaJuridica.Rows[index].Tr.FormularioPEPIrfk.element
                        .parentNode.querySelector('[id="btnUploadformularioPEP-Irfk"]').style.display = "none"
                }
            } catch (err) {
                console.info("Atualizando os Index da tabela Sócio Pessoa Jurídica")
                alteraObrigatoriedadeSocioPessoaJuridica()
                alteraObrigatoriedadeSocioPessoaJuridicaCampoEPep()
                validaCNPJSocioPessoaJuridicaCampoCNPJ()
                pegaValorNomeSocioPessoaJuridicaCampoNome()
            }
        }).TriggerChange()
    }
}

function adicionarLinhasTabelaDocumentosSocios() {
    let table = document.getElementById("DocumentosSocios")
    const btnInsertNewRow = table.querySelector("button[id=btnInsertNewRow]")
    btnInsertNewRow.addEventListener('click', function () {
        definirTipoDocumentoSocios()
        definirSubtipoDocumentoSocios()
        removerNomeSocioDocumentoSocio()
    })
}

function definirTipoDocumentoSocios() {
    for (let index = 0; index < Zeev.Form.Tables.DocumentosSocios.Rows.length; index++) {

        Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.Socio.OnChange(() => {
            try {
                const socio = Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.Socio.GetValue()

                const select = Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.TipoDoDocumentoWjdp.element

                for (let i = 1; i < select.options.length; i++) {
                    select.options[i].style.display = 'none'
                }

                let TIPO = []
                if (socio.includes("(PF)")) {
                    TIPO = TIPOS_DOCUMENTOS_SOCIOS_PF
                } else if (socio.includes("(PJ)")) {
                    TIPO = TIPOS_DOCUMENTOS_SOCIOS_PJ
                }

                for (let documentos of TIPO) {
                    const option = select.querySelector(`option[value="${documentos}"]`)

                    if (option) option.style.display = "inline"; // Exibe os valores presentes no array
                }

                if (TIPO.length > 0 && !TIPO.includes(select.value)) {
                    select.value = ''
                }

                const nomeSocios = SicoobZeev.ferramentasHTML.tabela.obterDadosTabelaMultivaloradaPorColuna("Documentos do sócio", "inpsocio")

                if (!nomeSocios.every(socio => socio === "")) {
                    Zeev.Form.Fields.VariaveisDoProcesso.Auxnomesocio.SetValue(nomeSocios)
                }
            } catch (err) {
                console.info("Atualizando os Index da tabela Documentos Sócios")
                definirTipoDocumentoSocios()
            }
        }).TriggerChange()
    }
}

function definirSubtipoDocumentoSocios() {
    for (let index = 0; index < Zeev.Form.Tables.DocumentosSocios.Rows.length; index++) {

        Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.TipoDoDocumentoWjdp.OnChange(() => {
            try {
                const socio = Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.Socio.GetValue()
                const tipoDocumento = Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.TipoDoDocumentoWjdp.GetValue()

                const select = Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.Subtipo.element

                for (let i = 1; i < select.options.length; i++) {
                    select.options[i].style.display = 'none'
                }

                let SUBTIPOS = []
                if (socio.includes("(PF)")) {
                    if (tipoDocumento === "DADOS FINANCEIROS") {
                        SUBTIPOS = TIPO_RENDA_PF
                    } else if (tipoDocumento === "DADOS PATRIMONIAIS") {
                        SUBTIPOS = SUBTIPOS_DADOS_PATRIMONIAIS_PF
                    }
                } else if (socio.includes("(PJ)")) {
                    if (tipoDocumento === "DADOS FINANCEIROS") {
                        SUBTIPOS = TIPO_RENDA_PJ
                    } else if (tipoDocumento === "DADOS PATRIMONIAIS") {
                        SUBTIPOS = SUBTIPOS_DADOS_PATRIMONIAIS_PJ
                    } else if (tipoDocumento === "DOCUMENTOS EMPRESARIAIS") {
                        SUBTIPOS = SUBTIPOS_DADOS_EMPRESARIAIS_SOCIOPJ
                    }
                }

                for (let documentos of SUBTIPOS) {
                    const option = select.querySelector(`option[value="${documentos}"]`)

                    if (option) option.style.display = "inline"; // Exibe os valores presentes no array
                }

                if (SUBTIPOS.length > 0 && !SUBTIPOS.includes(select.value)) {
                    select.value = ''
                }

            } catch (err) {
                console.info("Atualizando os Index da tabela Documentos Sócios")
                definirTipoDocumentoSocios()
            }
        }).TriggerChange()
    }
}

function removerNomeSocioDocumentoSocio() {
    for (let index = 0; index < Zeev.Form.Tables.DocumentosSocios.Rows.length; index++) {
        Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.BtnDelete.addEventListener("click", () => {
            const newArraySocios = []
            const socios = SicoobZeev.ferramentasHTML.tabela.obterDadosTabelaMultivaloradaPorColuna("Documentos do sócio", "inpsocio")

            for (let i in socios) {
                if (i != index) {
                    newArraySocios.push(socios[i])
                }
            }
            Zeev.Form.Fields.VariaveisDoProcesso.Auxnomesocio.SetValue(newArraySocios)
        })
    }
}

function definirNomeDosSociosDocumentoSocio() {
    const socios = Zeev.Form.Fields.VariaveisDoProcesso.Auxnomesocio.GetValue()

    const ArraySocios = socios.split(',');

    for (let index = 0; index < Zeev.Form.Tables.DocumentosSocios.Rows.length; index++) {
        Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.Socio.SetValue(ArraySocios[index])
        Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.Socio.TriggerChange()
        Zeev.Form.Tables.DocumentosSocios.Rows[index].Tr.TipoDoDocumentoWjdp.TriggerChange()
    }
}

function atualizandoSelectSocioTabelaDocumentoSocio() {
    const socios = []
    const tabelasociosPF = SicoobZeev.ferramentasHTML.tabela.obterDadosTabelaMultivaloradaPorColuna("Sócio pessoa física", "inpnome")
    const tabelasociosPJ = SicoobZeev.ferramentasHTML.tabela.obterDadosTabelaMultivaloradaPorColuna("Sócio pessoa jurídica", "inprazaoSocial")

    for (let socio of tabelasociosPF) {
        if (socio !== "") {
            socio = socio.replace(/,/g, "")
            socios.push(`(PF) ${socio}`)
        }
    }

    for (let socio of tabelasociosPJ) {
        if (socio !== "") {
            socio = socio.replace(/,/g, "")
            socios.push(`(PJ) ${socio}`)
        }
    }

    const selects = document.querySelectorAll('[id = "inpsocio"]')
    for (let select of selects) {
        for (options of select.options) {
            if (!socios.includes(options.value)) {
                if (options.style.display != "none") {
                    options.style.display = "none"
                }
            } else {
                if (options.style.display === "none") {
                    options.style.display = ""
                }
            }
        }
    }

    SicoobZeev.ferramentasHTML.campoSelecao.adicionarValorNoSelect("inpsocio", socios)
}

function mudarVisualizacaoDadosAssociado() {
    const tipoPessoa = Zeev.Form.Fields.DadosDaSolicitacao.TipoDaPessoa.GetValue()

    if (tipoPessoa !== "") {
        Zeev.Form.Fields.DadosDoAssociado.DontShow(true)
        SicoobZeev.ferramentasHTML.Alertas.apagarAlertSpam("inpcPFCNPJ")
        Zeev.Form.Fields.DadosDoAssociado.Reveal()
        Zeev.Form.Fields.DadosDoAssociado.EMEI.DontShow(true)
    } else {
        Zeev.Form.Fields.DadosDoAssociado.DontShow(true)
    }
}

function ValidarCPFCNPJSocios(campo, tipoAceito) {

    let valorDoCampo = campo.GetValue()

    if (valorDoCampo != "") {
        let validador = SicoobZeev.validadores.validarCPFCNPJ(valorDoCampo)

        if (tipoAceito === "PF") {
            if (!validador.valido || validador.tipo != "PF") {
                campo.SetValue("")
                cryo_alert("O CPF informado é inválido!")
            }
        } else if (tipoAceito === "PJ") {
            if (!validador.valido || validador.tipo != "PJ") {
                campo.SetValue("")
                cryo_alert("O CNPJ informado é inválido!")
            }
        }
    }
}

function definirComprovantesDeRenda() {
    const tipoDaPessoa = Zeev.Form.Fields.DadosDaSolicitacao.TipoDaPessoa.GetValue()

    if (tipoDaPessoa === "Produtor rural") {
        SicoobZeev.ferramentasHTML.campoSelecao.exibirValoresDoArray("inptipoDoComprovante", TIPO_RENDA_PR)
    } else if (tipoDaPessoa === "Pessoa física") {
        SicoobZeev.ferramentasHTML.campoSelecao.exibirValoresDoArray("inptipoDoComprovante", TIPO_RENDA_PF)
    } else if (tipoDaPessoa === "Pessoa jurídica") {
        SicoobZeev.ferramentasHTML.campoSelecao.exibirValoresDoArray("inptipoDoComprovante", TIPO_RENDA_PJ)
    }
}

function seguirComAberturaDeConta() {
    const abrirConta = Zeev.Form.Fields.AberturaConta.VaiSeguirComAberturaDaConta.GetValue()

    if (abrirConta === "Sim") {
        Zeev.Form.Fields.AberturaConta.FotoDoCooperado.Reveal()
        Zeev.Form.Fields.AberturaConta.CartaoAutografo.Reveal()

        Zeev.Form.Tables.FichaCadastral.Reveal()
    } else {
        Zeev.Form.Fields.AberturaConta.FotoDoCooperado.DontShow(true)
        Zeev.Form.Fields.AberturaConta.FotoDoCooperado.element.checked = false

        Zeev.Form.Fields.AberturaConta.CartaoAutografo.DontShow(true)
        Zeev.Form.Fields.AberturaConta.CartaoAutografo.element.checked = false

        Zeev.Form.Tables.FichaCadastral.Clean()
        Zeev.Form.Tables.FichaCadastral.DontShow()
    }
}

function mostrarCamposDeDevolução() {
    let decisao = Zeev.Form.Fields.AnaliseCadastro.Decisao.GetValue()
    var btnSISBR = new Zeev.Form.Functions.CreateElementMapping("[id='customBtn_Incluido no Sisbr']", "N")
    var btnDevolver = new Zeev.Form.Functions.CreateElementMapping("[id='customBtn_Devolvido']", "N")

    if (decisao === "Incluído no SISBR sem pendência") {
        Zeev.Form.Fields.AnaliseCadastro.CadastroDeOutraCooperativa.Reveal()
        Zeev.Form.Fields.Devolucao.DontShow(true)
        btnSISBR.Reveal()
        btnDevolver.DontShow()
    } else if (decisao === "Devolver para correção") {
        Zeev.Form.Fields.AnaliseCadastro.CadastroDeOutraCooperativa.DontShow(true)
        Zeev.Form.Fields.AnaliseCadastro.NumeroDaCooperativa.DontShow(true)
        Zeev.Form.Fields.Devolucao.Reveal()
        btnSISBR.DontShow()
        btnDevolver.Reveal()
    } else {
        Zeev.Form.Fields.AnaliseCadastro.CadastroDeOutraCooperativa.DontShow(true)
        Zeev.Form.Fields.Devolucao.DontShow(true)
        btnSISBR.DontShow()
        btnDevolver.DontShow()
    }
}

function mostrarCampoNumeroCooperativa() {
    let outraCooperativa = Zeev.Form.Fields.AnaliseCadastro.CadastroDeOutraCooperativa.GetValue()

    if (outraCooperativa == "Sim") {
        Zeev.Form.Fields.AnaliseCadastro.NumeroDaCooperativa.Reveal()
    } else {
        Zeev.Form.Fields.AnaliseCadastro.NumeroDaCooperativa.DontShow(true)
    }
}

const validarCPFCNPJDoCooperado = () => {
    const tipoDaPessoa = Zeev.Form.Fields.DadosDaSolicitacao.TipoDaPessoa.GetValue()
    const cpfcnpj = Zeev.Form.Fields.DadosDoAssociado.CPFCNPJ.GetValue()

    let documento_limpo = cpfcnpj.replace(/\D/g, '');

    let validador = SicoobZeev.validadores.validarCPFCNPJ(documento_limpo)

    if (tipoDaPessoa === "Produtor rural" || tipoDaPessoa === "Pessoa física") {
        if (!validador.valido || validador.tipo != "PF") {
            Zeev.Form.Fields.DadosDoAssociado.CPFCNPJ.SetValue("")
            SicoobZeev.ferramentasHTML.Alertas.criarAlertSpam("inpcPFCNPJ", "O CPF informado é inválido!", "red")
        } else {
            Zeev.Form.Fields.DadosDoAssociado.CPFCNPJ.SetValue(documento_limpo)
            SicoobZeev.ferramentasHTML.Alertas.apagarAlertSpam("inpcPFCNPJ")
        }

    } else if (tipoDaPessoa === "Pessoa jurídica") {
        if (!validador.valido || validador.tipo != "PJ") {
            Zeev.Form.Fields.DadosDoAssociado.CPFCNPJ.SetValue("")
            SicoobZeev.ferramentasHTML.Alertas.criarAlertSpam("inpcPFCNPJ", "O CNPJ informado é inválido!", "red")
        } else {
            Zeev.Form.Fields.DadosDoAssociado.CPFCNPJ.SetValue(documento_limpo)
            SicoobZeev.ferramentasHTML.Alertas.apagarAlertSpam("inpcPFCNPJ")
        }
    }
}

const mostrarCampoMei = () => {
    const nome = Zeev.Form.Fields.DadosDoAssociado.NomeRazaoSocial.GetValue()

    let contemMaisDe5Numeros = nome.match(/\d/g)

    if (contemMaisDe5Numeros && contemMaisDe5Numeros.length > 5) {
        Zeev.Form.Fields.DadosDoAssociado.EMEI.Reveal()
        Zeev.Form.Fields.DadosDoAssociado.EMEI.SetValue("Sim")
        Zeev.Form.Fields.DadosDoAssociado.EMEI.element.checked = true
    } else {
        Zeev.Form.Fields.DadosDoAssociado.EMEI.DontShow()
        Zeev.Form.Fields.DadosDoAssociado.EMEI.SetValue("")
        Zeev.Form.Fields.DadosDoAssociado.EMEI.element.checked = false
    }
}

const mostrarCamposdoPatrimonio = () => {
    let possuiPatrimonio = Zeev.Form.Fields.DadosPatrimoniais.PossuiPatrimonio.GetValue()

    if (possuiPatrimonio == "Sim") {
        Zeev.Form.Tables.Patrimonios.Reveal()
    } else {
        Zeev.Form.Tables.Patrimonios.Clean()
        Zeev.Form.Tables.Patrimonios.DontShow(true)
    }
}

const mostrarCamposInformacoesPessoaJuridica = () => {
    let tipoPessoa = Zeev.Form.Fields.DadosDaSolicitacao.TipoDaPessoa.GetValue()

    if (tipoPessoa == "Pessoa jurídica") {
        Zeev.Form.Fields.InformacoesPessoaJuridica.Reveal()
    } else {
        Zeev.Form.Fields.InformacoesPessoaJuridica.DontShow()
    }
}

const mostrarCamposdoPEP = () => {
    let ehPEP = Zeev.Form.Fields.PEP.EPEP.GetValue()

    if (ehPEP == "Sim") {
        Zeev.Form.Fields.PEP.FormularioPEP.Reveal()
    } else {
        Zeev.Form.Fields.PEP.FormularioPEP.DontShow(true)
    }
}

const mostrarCamposdaRenda = () => {
    let possuiRenda = Zeev.Form.Fields.DadosFinanceiros.PossuiRenda.GetValue()

    if (possuiRenda == "Sim") {
        Zeev.Form.Tables.Comprovantes.Reveal()
    } else {
        Zeev.Form.Tables.Comprovantes.Clean()
        Zeev.Form.Tables.Comprovantes.DontShow(true)
    }
}

const mostrarCamposQRSAC = () => {
    let possuiQRSAC = Zeev.Form.Fields.QuestionarioQRSAC.PossuiQRSAC.GetValue()

    if (possuiQRSAC == "Sim") {
        Zeev.Form.Tables.QRSAC.Reveal()
    } else {
        Zeev.Form.Tables.QRSAC.Clean()
        Zeev.Form.Tables.QRSAC.DontShow(true)
    }
}

const mostrarCamposRelacionamentoEPoderes = () => {
    let possuiRelacionamentoEPoderes = Zeev.Form.Fields.RelacionamentoEPoderes.Tipo.GetValue()

    if (possuiRelacionamentoEPoderes == "Sim") {
        Zeev.Form.Tables.RelacionamentoPoderes.Reveal()
    } else {
        Zeev.Form.Tables.RelacionamentoPoderes.Clean()
        Zeev.Form.Tables.RelacionamentoPoderes.DontShow(true)
    }
}

const mostrarCamposGrupoEconomico = () => {
    let possuiGrupoEconomico = Zeev.Form.Fields.GrupoEconomico.FormarGrupoEconomico.GetValue()

    if (possuiGrupoEconomico == "Sim") {
        Zeev.Form.Tables.Pessoas.Reveal()
    } else {
        Zeev.Form.Tables.Pessoas.Clean()
        Zeev.Form.Tables.Pessoas.DontShow(true)
    }
}

const validarCPFCNPJDoConjuge = () => {
    const cpfcnpj = Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.GetValue()

    let documento_limpo = cpfcnpj.replace(/\D/g, '')

    let cpfCnpjEhValido = SicoobZeev.validadores.validarCPFCNPJ(documento_limpo)

    //se cpf não é valido
    if (!cpfCnpjEhValido.valido || cpfCnpjEhValido.tipo != "PF") {
        Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.SetValue("")
        SicoobZeev.ferramentasHTML.Alertas.criarAlertSpam("inpcPFDoConjuge", "CPF inválido", "red")
    } else {
        Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.SetValue(documento_limpo)
        SicoobZeev.ferramentasHTML.Alertas.apagarAlertSpam("inpcPFDoConjuge")
    }
}

function adicionarLinhasTabelaGrupoEconomico() {
    let table = document.getElementById("Pessoas")
    const btnInsertNewRow = table.querySelector("button[id=btnInsertNewRow]")
    btnInsertNewRow.addEventListener('click', function () {
        validaCPFCNPJGrupoEconomicoCampoCPFCNPJ()
    })
}

function validaCPFCNPJGrupoEconomicoCampoCPFCNPJ() {
    for (let index = 0; index < Zeev.Form.Tables.Pessoas.Rows.length; index++) {
        Zeev.Form.Tables.Pessoas.Rows[index].Tr.CPFCNPJZyev.OnChange(() => {
            try {
                validarCPFCNPJDoGrupoEconomico(Zeev.Form.Tables.Pessoas.Rows[index].Tr.CPFCNPJZyev)
            } catch (err) {
                console.info("Atualizando os Index da tabela Grupo Econômico")
                validaCPFCNPJGrupoEconomicoCampoCPFCNPJ()
            }
        }).TriggerChange()
    }
}

function validarCPFCNPJDoGrupoEconomico(campo) {
    const cpfcnpj = campo.GetValue()

    if (cpfcnpj !== "") {
        let documento_limpo = cpfcnpj.replace(/\D/g, '')

        let cpfCnpjEhValido = SicoobZeev.validadores.validarCPFCNPJ(documento_limpo)

        //se cpf não é valido
        if (!cpfCnpjEhValido.valido) {
            campo.SetValue("")
            cryo_alert("O CPF/CNPJ informado é inválido!")
        } else {
            campo.SetValue(documento_limpo)
        }
    }
}

const tornarCamposObrigatoriosConformeEstadoCivil = () => {
    let estadoCivil = Zeev.Form.Fields.InformacoesBasicas.EstadoCivil.GetValue()

    if (estadoCivil != "SOLTEIRO(A)" && estadoCivil != "") {
        Zeev.Form.Fields.InformacoesBasicas.ComprovanteDeEstadoCivil.Reveal()

        if (estadoCivil === "UNIÃO ESTÁVEL" || estadoCivil === "CASADO(A)") {
            Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.Reveal()
            Zeev.Form.Fields.InformacoesBasicas.DocumentoConjuge.Reveal()
        } else {
            Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.DontShow(true)
            Zeev.Form.Fields.InformacoesBasicas.DocumentoConjuge.DontShow(true)
        }
    }
    else {
        Zeev.Form.Fields.InformacoesBasicas.ComprovanteDeEstadoCivil.DontShow(true)
        Zeev.Form.Fields.InformacoesBasicas.CPFDoConjuge.DontShow(true)
        Zeev.Form.Fields.InformacoesBasicas.DocumentoConjuge.DontShow(true)
    }
}

function ocultarGrupos() {
    Zeev.Form.Fields.VariaveisDoProcesso.DontShow()
}

function definirResponsaveisProcesso() {
    const botaoEnviar = document.getElementById("customBtn_Solicitação enviada")

    botaoEnviar.addEventListener("click", () => {
        const assistentes = SicoobZeev.ferramentasHTML.tabela.obterDadosTabelaMultivaloradaPorColuna("Assistentes do processo", "inpcodcolaborador")
        const iniciadorDoProcesso = Zeev.Form.Fields.VariaveisDoProcesso.Usuarioiniciador.GetValue()

        Zeev.Form.Fields.VariaveisDoProcesso.Responsaveisdoprocesso.SetValue(`${iniciadorDoProcesso}${assistentes != "" ? ',' + assistentes : ''}`)
    })
}

const cnaeInvalidos = [
    {
        "COD_CNAE": "K6421200",
        "DESC_ATIVIDADE_ECO": "BANCO COMERCIAL"
    },
    {
        "COD_CNAE": "K6424704",
        "DESC_ATIVIDADE_ECO": "COOPERATIVA DE CRÉDITO RURAL"
    },
    {
        "COD_CNAE": "K6432800",
        "DESC_ATIVIDADE_ECO": "BANCO DE INVESTIMENTO"
    },
    {
        "COD_CNAE": "K6435201",
        "DESC_ATIVIDADE_ECO": "INSTITUIÇÃO DE CRÉDITO IMOBILIÁRIO"
    },
    {
        "COD_CNAE": "K6436100",
        "DESC_ATIVIDADE_ECO": "COMPANHIA DE CRÉDITO, FINANCIAMENTO E INVESTIMENTO (FINANCEIRA)"
    },
    {
        "COD_CNAE": "K6437900",
        "DESC_ATIVIDADE_ECO": "SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR"
    },
    {
        "COD_CNAE": "K6470101",
        "DESC_ATIVIDADE_ECO": "FUNDOS DE INVESTIMENTO"
    },
    {
        "COD_CNAE": "K6470102",
        "DESC_ATIVIDADE_ECO": "FUNDOS DE INVESTIMENTO PREVIDENCIÁRIOS"
    },
    {
        "COD_CNAE": "K6470103",
        "DESC_ATIVIDADE_ECO": "FUNDOS DE INVESTIMENTO IMOBILIÁRIO"
    },
    {
        "COD_CNAE": "K6491300",
        "DESC_ATIVIDADE_ECO": "SOCIEDADE DE FOMENTO MERCANTIL"
    },
    {
        "COD_CNAE": "K6499901",
        "DESC_ATIVIDADE_ECO": "CLUBES DE INVESTIMENTO"
    },
    {
        "COD_CNAE": "K6499902",
        "DESC_ATIVIDADE_ECO": "SOCIEDADE DE INVESTIMENTO"
    },
    {
        "COD_CNAE": "K6410700",
        "DESC_ATIVIDADE_ECO": "BANCO CENTRAL"
    },
    {
        "COD_CNAE": "K6422100",
        "DESC_ATIVIDADE_ECO": "BANCOS MÚLTIPLOS, COM CARTEIRA COMERCIAL"
    },
    {
        "COD_CNAE": "K6423900",
        "DESC_ATIVIDADE_ECO": "CAIXAS ECONÔMICAS"
    },
    {
        "COD_CNAE": "K6424701",
        "DESC_ATIVIDADE_ECO": "BANCOS COOPERATIVOS"
    },
    {
        "COD_CNAE": "K6424702",
        "DESC_ATIVIDADE_ECO": "COOPERATIVAS CENTRAIS DE CRÉDITO"
    },
    {
        "COD_CNAE": "K6424703",
        "DESC_ATIVIDADE_ECO": "COOPERATIVAS DE CRÉDITO MÚTUO"
    },
    {
        "COD_CNAE": "K6431000",
        "DESC_ATIVIDADE_ECO": "BANCOS MÚLTIPLOS, SEM CARTEIRA COMERCIAL"
    },
    {
        "COD_CNAE": "K6433600",
        "DESC_ATIVIDADE_ECO": "BANCOS DE DESENVOLVIMENTO"
    },
    {
        "COD_CNAE": "K6434400",
        "DESC_ATIVIDADE_ECO": "AGÊNCIA DE FOMENTO"
    },
    {
        "COD_CNAE": "K6435202",
        "DESC_ATIVIDADE_ECO": "ASSOCIAÇÕES DE POUPANÇA E EMPÉSTIMO"
    },
    {
        "COD_CNAE": "K6435203",
        "DESC_ATIVIDADE_ECO": "COMPANHIAS HIPOTECÁRIAS"
    },
    {
        "COD_CNAE": "K6436100",
        "DESC_ATIVIDADE_ECO": "SOCIEDADES CRÉDITO, FINANCIAMENTO E INVENTIMENTOS ? FINANCEIRAS"
    },
    {
        "COD_CNAE": "K6434400",
        "DESC_ATIVIDADE_ECO": "AGÊNCIA DE FOMENTO"
    },
    {
        "COD_CNAE": "K6435202",
        "DESC_ATIVIDADE_ECO": "ASSOCIAÇÕES DE POUPANÇA E EMPRÉSTIMO"
    },
    {
        "COD_CNAE": "K6435203",
        "DESC_ATIVIDADE_ECO": "COMPANHIAS HIPOTECÁRIAS"
    },
    {
        "COD_CNAE": "K6438701",
        "DESC_ATIVIDADE_ECO": "BANCOS DE CÂMBIO"
    },
    {
        "COD_CNAE": "K6438799",
        "DESC_ATIVIDADE_ECO": "OUTRAS INTITUIÇÕES DE INTERMEDIAÇÃO NÃO MONETÁRIA"
    },
    {
        "COD_CNAE": "K6440900",
        "DESC_ATIVIDADE_ECO": "ARRENDAMENTO MERCANTIL"
    },
    {
        "COD_CNAE": "K6450600",
        "DESC_ATIVIDADE_ECO": "SOCIEDADES DE CAPITALIZAÇÃO"
    },
    {
        "COD_CNAE": "K6461100",
        "DESC_ATIVIDADE_ECO": "HOLDINGS DE INSTITUIÇÕES FINANCEIRAS"
    },
    {
        "COD_CNAE": "K6462000",
        "DESC_ATIVIDADE_ECO": "HOLDINGS DE INSTITUIÇÕES NÃO FINANCEIRAS"
    },
    {
        "COD_CNAE": "K6463800",
        "DESC_ATIVIDADE_ECO": "OUTRAS SOCIEDADES DE PARTICIPAÇÃO, EXCETO HOLDINGS"
    },
    {
        "COD_CNAE": "K6492100",
        "DESC_ATIVIDADE_ECO": "SECURITIZAÇÃO DE CRÉDITOS"
    },
    {
        "COD_CNAE": "K6493000",
        "DESC_ATIVIDADE_ECO": "ADMINISTRAÇÃO DE CONSÓRCIO PARA AQUISIÇÃO DE BENS E DIREITOS"
    },
    {
        "COD_CNAE": "K6499903",
        "DESC_ATIVIDADE_ECO": "FUNDO GARANTIDOR DE CRÉDITO"
    },
    {
        "COD_CNAE": "K6499904",
        "DESC_ATIVIDADE_ECO": "CAIXAS DE FINANCIAMENTO DE CORPORAÇÕES"
    },
    {
        "COD_CNAE": "K6499905",
        "DESC_ATIVIDADE_ECO": "CONCESSÃO DE CRÉDITO PELAS OSCIP"
    },
    {
        "COD_CNAE": "K6499999",
        "DESC_ATIVIDADE_ECO": "OUTRAS ATIVIDADES DE SERVIÇOS FINANCEIROS NÃO ESPECIFICADOS ANTERIORMENTE"
    },
    {
        "COD_CNAE": "K6611801",
        "DESC_ATIVIDADE_ECO": "BOLSA DE VALORES"
    },
    {
        "COD_CNAE": "K6611802",
        "DESC_ATIVIDADE_ECO": "BOLSA DE MERCADORIAS"
    },
    {
        "COD_CNAE": "K6611803",
        "DESC_ATIVIDADE_ECO": "BOLSA DE MERCADORIAS E FUTURO"
    },
    {
        "COD_CNAE": "K6611804",
        "DESC_ATIVIDADE_ECO": "ADMINISTRAÇÃO DE MERCADOS DE BALCÃO ORGANIZADOS"
    },
    {
        "COD_CNAE": "K6630400",
        "DESC_ATIVIDADE_ECO": "ATIVIDADES DE ADMNISTRAÇÃO DE FUNDOS POR CONTRATO OU COMISSÃO"
    },
    {
        "COD_CNAE": "N8299705",
        "DESC_ATIVIDADE_ECO": "FINANCIAMENTO COLETIVO (CROWDFUNDING) SERVIÇOS DE"
    },
    {
        "COD_CNAE": "N8299706",
        "DESC_ATIVIDADE_ECO": "CASA LOTÉRICA"
    },
    {
        "COD_CNAE": "O8411600",
        "DESC_ATIVIDADE_ECO": "ADMINISTRAÇÃO DA POLÍTICA ECONÔMICA E FISCAL FEDERAL, ESTADUAL, MUNICIPAL"
    },
    {
        "COD_CNAE": "O8412400",
        "DESC_ATIVIDADE_ECO": "ADMINISTRAÇÃO DE ARTE E CULTURA ADMINISTRAÇÃO PÚBLICA"
    },
    {
        "COD_CNAE": "O8413200",
        "DESC_ATIVIDADE_ECO": "DEFINIÇÃO DE POLÍTICAS DE DESENVOLVIMENTO REGIONAIS OU SETORIAIS"
    },
    {
        "COD_CNAE": "O8421300",
        "DESC_ATIVIDADE_ECO": "ASSISTÊNCIA INTERNACIONAL ADMINISTRAÇÃO FEDERAL"
    },
    {
        "COD_CNAE": "O8422100",
        "DESC_ATIVIDADE_ECO": "ADMINISTRAÇÃO E GESTÃO DAS ATIVIDADES DE DEFESA NACIONAL"
    },
    {
        "COD_CNAE": "O8423000",
        "DESC_ATIVIDADE_ECO": "SUPREMO TRIBUNAL FEDERAL"
    },
    {
        "COD_CNAE": "O8424800",
        "DESC_ATIVIDADE_ECO": "ADMINISTRAÇÃO E FUNCIONAMENTO DA GUARDA MUNICIPAL"
    },
    {
        "COD_CNAE": "O8425600",
        "DESC_ATIVIDADE_ECO": "ORGANIZAÇÃO DE ASSISTÊNCIA EM CATÁSTROFES ADMINISTRAÇÃO PÚBLICA"
    },
    {
        "COD_CNAE": "O8430200",
        "DESC_ATIVIDADE_ECO": "MINISTÉRIO DA PREVIDÊNCIA SOCIAL"
    }
]

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        Zeev.Controller.Settings.Init()
    }, 200)
})